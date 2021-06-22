import { Divider, Drawer, Fab, IconButton, ListItem, ListItemText, Menu, MenuItem } from "@material-ui/core";
import { Button, Typography } from "@material-ui/core";
import React, { ReactNode, useEffect, useState } from "react";
import OuterFrame from "./OuterFrame";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import router from "next/router";
import CheckIcon from '@material-ui/icons/Check';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ISessionId, SessionId } from "../query_param_shemas/SessionId";
import ManageTopSwitch from "./ManageTopSwitch";
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';

export const LAYOUT_TYPE = {
    EDIT: 1,
    MENU: 2,
};

interface IProps {
    pageTitle: string
    pageLayoutType: number
    snackBar?: {
        state: boolean,
        setState: React.Dispatch<React.SetStateAction<boolean>>,
        msg: string
    }
    sessionId: string
    AddUrl? : string
    disableRightButton? : boolean
    onRightButtonClicked? : (event : any) => any
    children?: ReactNode
};

const ManagementCommon = (props: IProps) => {
    const appbar = { title: props.pageTitle };
    const fab = props.AddUrl != undefined ?
        (
        <Fab color="primary" aria-label="add" style={{
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        }}
        onClick={()=>{router.push(`${props.AddUrl}?${SessionId({sessionId:props.sessionId})}`)}}>
            <AddIcon />
        </Fab>
        ): (<></>);
    if (props.pageLayoutType == LAYOUT_TYPE.MENU) {
        Object.defineProperty(
            appbar,
            "rightButton",
            {
                value:
                    (<IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                        <MoreVertIcon />
                    </IconButton>)
            }
        );
        Object.defineProperty(
            appbar,
            "leftButton",
            {
                value:
                    (<IconButton onClick={() => isDrawerOpen[1](true)}>
                        <MenuIcon />
                    </IconButton>)
            }
        );
    } else if (props.pageLayoutType == LAYOUT_TYPE.EDIT) {
        Object.defineProperty(
            appbar,
            "leftButton",
            {
                value: (
                    <IconButton onClick={
                        () => router.back()
                    }>
                        <ArrowBackIosIcon />
                    </IconButton>
                )
            }
        );
        if(!props.disableRightButton)
            Object.defineProperty(
                appbar,
                "rightButton",
                {
                    value:
                        (
                            <IconButton onClick={props.onRightButtonClicked}>
                                <CheckIcon />
                            </IconButton>
                        )
                }
            );
    }
    const isDrawerOpen = useState(false);
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const [timer, setTimer] = useState(3);
    const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement | null>(null);
    const snackbar = {
        state: snackbarState,
        setState: setSnackbarState,
        msg: snackbarMsg
    }
    const onLogout = async () => {
        const sessionId: ISessionId = { sessionId: localStorage.getItem("sessionId") || "invalid session" };
        await fetch("/api/Login", {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sessionId)
        })
            .then(res => res.json())
            .then((json: { result: string }) => {
                if (json.result == "ok") {

                } else {
                    console.log(json);
                }
                localStorage.removeItem("sessionId");
                router.push("/Manage/LoginForm");
            })
            .catch((err) => {
                console.log(err);
                setSnackbarMsg("ログアウトに失敗しました。");
                setSnackbarState(true);
            });
    };
    useEffect(() => {
        if (props.sessionId == "Unauthorised") {
            setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
            if (timer == 0) {
                localStorage.removeItem("sessionId");
                router.push("/Manage/LoginForm");
            }
        }
    });
    return (
        <OuterFrame appbar={appbar} snackbar={props.snackBar || snackbar}>
            <Drawer anchor="left" open={isDrawerOpen[0]} onClose={() => isDrawerOpen[1](false)}>
                <div style={{ marginTop: "50px" }} />
                <Divider />
                <ListItem button key={"goManageTop"}>
                    <ListItemIcon onClick={() => { router.push(`/Manage/Top?${SessionId({ sessionId: props.sessionId })}`) }}>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="管理トップ"></ListItemText>
                </ListItem>
                <ListItem button key={"logout"}>
                    <ListItemIcon onClick={onLogout}>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="ログアウト"></ListItemText>
                </ListItem>
            </Drawer>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => { setAnchorEl(null); onLogout(); }}>ログアウト</MenuItem>
                <MenuItem onClick={() => { }}>選択項目削除</MenuItem>
            </Menu>
            <ManageTopSwitch isShow={props.sessionId == "Unauthorised"}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px",
                        height: "110px",
                        justifyContent: "space-around"
                    }}
                >
                    <Typography variant="h4" align="center">非公開エリア</Typography>
                    <Typography variant="subtitle1" align="center">{timer}秒後にログイン画面に移動します。</Typography>
                </div>
            </ManageTopSwitch>
            <ManageTopSwitch isShow={props.sessionId != "Unauthorised"}>
                {props.children}
                {fab}
            </ManageTopSwitch>
        </OuterFrame>
    )
};

export default ManagementCommon;