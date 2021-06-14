import { Button, IconButton } from "@material-ui/core";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import OuterFrame from "../../components/OuterFrame";
import { ISessionId } from "../../query_param_shemas/SessionId";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import router from "next/router";

export const getServerSideProps : GetServerSideProps = async (context) => {
    return{
        props:{
            sessionId : context.query.sessionId
        }
    }
};

const Top = (props : ISessionId) => {
    const [snackbarState,setSnackbarState] = useState(false);
    const [snackbarMsg,setSnackbarMsg] = useState("");
    const snackbar = {
        state:snackbarState,
        setState:setSnackbarState,
        msg:snackbarMsg
    }
    const onLogout = async () => {
        const sessionId : ISessionId = {sessionId:localStorage.getItem("sessionId") || "invalid session"};
        await fetch("/api/Logout",{
            method:"delete",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(sessionId)
        })
        .then(res => res.json())
        .then((json:{result:string}) => {
            if(json.result == "ok"){
                router.push("/Manage/LoginForm");
            }else{
                console.log(json);
                setSnackbarMsg("ログアウトに失敗しました。");
                setSnackbarState(true);
            }
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
        leftButton: <IconButton onClick={()=> router.back()}><ArrowBackIosIcon/></IconButton>
    }
    return (
        <>
        <OuterFrame appbar={appbar} snackbar={snackbar}>
                <h1>ここは管理トップです</h1>
                <p>{`あなたのセッションIDは${props.sessionId}です。`}</p>
        </OuterFrame>
        </>
    );
};
export default Top;