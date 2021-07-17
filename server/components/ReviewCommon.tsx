import { Divider, Drawer, IconButton, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { useState } from "react";
import OuterFrame from "./OuterFrame";
import MenuIcon from '@material-ui/icons/Menu';
import CheckIcon from '@material-ui/icons/Check';
import router from "next/router";
import Settings from "@material-ui/icons/Settings";

const ReviewCommon = (
    props: {
        appbar: {
            title: string;
            leftButton?: React.ReactNode;
            rightButton?: React.ReactNode;
        },
        snackBar: {
            state?: boolean | undefined;
            setState?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
            msg?: string | undefined;
        },
        children: JSX.Element;
    }
) => {
    const isDrawerOpen = useState(false);
    return (
        <OuterFrame appbar={{
            title: props.appbar.title,
            rightButton: props.appbar.rightButton,
            leftButton: <IconButton onClick={() => isDrawerOpen[1](true)}><MenuIcon /></IconButton>
        }} snackbar={props.snackBar}>
            <Drawer anchor="left" open={isDrawerOpen[0]} onClose={() => isDrawerOpen[1](false)}>
                <div style={{ marginTop: "50px" }} />
                <Divider />
                {(() => [
                    { name: "問題一覧", url: "/Play/ProblemList", icon: (<MenuIcon />) },
                    { name: "教科一覧", url: "/Play/SubjectList", icon: (<MenuIcon />) },
                    { name: "チェックリスト", url: "/Play/Check", icon: (<CheckIcon />) },
                    { name: "データ初期化", url: "/Play/initData", icon: (<Settings />) },
                    { name: "テーマ切り替え", url: "/Play/toggleTheme", icon: (<Settings />) }
                ].map(e => (
                    <ListItem button key={e.name} onClick={() => { router.push(e.url); }}>
                        <ListItemIcon>
                            {e.icon}
                        </ListItemIcon>
                        <ListItemText primary={e.name}></ListItemText>
                    </ListItem>
                )))()}
            </Drawer>
            {props.children}
        </OuterFrame>
    );
};

export default ReviewCommon;