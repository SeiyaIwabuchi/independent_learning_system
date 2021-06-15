import { Button, IconButton } from "@material-ui/core";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import OuterFrame from "../../components/OuterFrame";
import { ISessionId } from "../../query_param_shemas/SessionId";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import router from "next/router";
import db from "../../models";
import { useEffect } from "react";

export const getServerSideProps : GetServerSideProps = async (context) => {
    const sessionId = context.query.sessionId as string;
    const session_model = 
        await db.t_sessions.findByPk(sessionId);
    const resSessionId = session_model == null ? "Unauthorised" : `${session_model.id}`;
    return{
        props:{
            sessionId : resSessionId
        }
    }
};

const Top = (props : ISessionId) => {
    const [snackbarState,setSnackbarState] = useState(false);
    const [snackbarMsg,setSnackbarMsg] = useState("");
    const [timer,setTimer] = useState(3);
    const snackbar = {
        state:snackbarState,
        setState:setSnackbarState,
        msg:snackbarMsg
    }
    const onLogout = async () => {
        const sessionId : ISessionId = {sessionId:localStorage.getItem("sessionId") || "invalid session"};
        await fetch("/api/Login",{
            method:"delete",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(sessionId)
        })
        .then(res => res.json())
        .then((json:{result:string}) => {
            if(json.result == "ok"){

            }else{
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
        leftButton: <IconButton onClick={()=> router.back()}><ArrowBackIosIcon/></IconButton>
    }
    useEffect(()=>{
        if(props.sessionId == "Unauthorised"){
            setTimeout(() => {
                setTimer(timer - 1);
            },1000);
            if(timer == 0){
                localStorage.removeItem("sessionId");
                router.push("/Manage/LoginForm");
            }
        }
    });
    return (
        <>
        <OuterFrame appbar={appbar} snackbar={snackbar}>
        {
            props.sessionId == "Unauthorised" ?
            <>
            <h1>非公開エリア</h1> 
            <p>{timer}秒後にログイン画面に移動します。</p>
            </>
            :
            <>
            <h1>ここは管理トップです</h1>
            <p>{`あなたのセッションIDは${props.sessionId}です。`}</p>
            <div
            style={{
                display:"flex",
                flexDirection:"column",
                justifyContent : "space-between",
                height:"150px"
            }}>
            <Button variant="contained" color="primary">教科管理</Button>
            <Button variant="contained" color="primary">問題管理</Button>
            <Button variant="contained" color="primary">管理ユーザの管理</Button>
            </div>
            </>
        }
        </OuterFrame>
        </>
    );
};
export default Top;