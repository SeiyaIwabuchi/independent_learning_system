import { GetServerSideProps } from "next";
import React, { useState } from "react";
import OuterFrame from "../../components/OuterFrame";
import { ISessionId } from "../../query_param_shemas/SessionId";

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
    const appbar = {
        title: "管理トップ",
        rightButton: <></>,
        leftButton: <></>
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