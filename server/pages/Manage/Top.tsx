import { Button, IconButton, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import OuterFrame from "../../components/OuterFrame";
import { ISessionId, SessionId } from "../../query_param_shemas/SessionId";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import router from "next/router";
import db from "../../models";
import { useEffect } from "react";
import ManageTopSwitch from "../../components/ManageTopSwitch";
import SessionIdValidater from "../../utils/SessionIdValidater";
import ManageMenuList, { IElemetPorps } from "../../components/ManageMenuList";
import ManagementCommon, { LAYOUT_TYPE } from "../../components/ManagementCommon";


export const getServerSideProps: GetServerSideProps = async (context) => {
    const sessionId = context.query.sessionId as string;
    const session_model =
        await db.t_sessions.findByPk(sessionId);
    const resSessionId = session_model == null ? "Unauthorised" : `${session_model.id}`;
    return {
        props: {
            sessionId: await SessionIdValidater(context)
        }
    }
};


const Top = (props: ISessionId) => {

    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const [timer, setTimer] = useState(3);

    const TopMenuList: IElemetPorps[] = [
        {
            primaryText: "教科管理",
            secondaryText: "教科の変更、追加、削除",
            destinationURL: `/Manage/Subject/List?${SessionId({ sessionId: props.sessionId })}`,
        },
        {
            primaryText: "問題管理",
            secondaryText: "問題の変更、追加、削除",
            destinationURL: `/Manage/Problem/List?${SessionId({ sessionId: props.sessionId })}`,
        },
        {
            primaryText: "管理ユーザの管理",
            secondaryText: "管理ユーザの変更、追加、削除",
            destinationURL: `/Manage/User/List?${SessionId({ sessionId: props.sessionId })}`,
        },
    ];

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

    const appbar = {
        title: "管理トップ",
        rightButton: <Button variant="contained" onClick={onLogout}>ログアウト</Button>,
        leftButton: <IconButton onClick={() => router.back()}><ArrowBackIosIcon /></IconButton>
    }

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
        <>
            <ManagementCommon 
                pageTitle="管理トップ" 
                pageLayoutType={LAYOUT_TYPE.MENU}
                sessionId={props.sessionId}
                >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px",
                        height: "110px",
                        justifyContent: "space-around"
                    }}
                >
                    <Typography variant="h4" align="center">管理トップ</Typography>
                    <Typography variant="subtitle1" align="center">自主学習システムの管理を行えます。</Typography>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        border: "1px solid #b3b1b1",
                        borderRadius: "10px",
                        padding: "10px"
                    }}>
                    <ManageMenuList menuList={TopMenuList} />
                </div>
            </ManagementCommon>
        </>
    );

};
export default Top;