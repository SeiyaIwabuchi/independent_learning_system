import React, { useState } from "react";
import OuterFrame from "../../components/OuterFrame";

const Top = () => {
    const [snackbarState,setSnackbarState] = useState(false);
    const [snackbarMsg,setSnackbarMsg] = useState("");
    const snackbar = {
        state:snackbarState,
        setState:setSnackbarState,
        msg:snackbarMsg
    }
    const appbar = {
        title: "ログイン",
        rightButton: <></>,
        leftButton: <></>
    }
    return (
        <>
        <OuterFrame appbar={appbar} snackbar={snackbar}>
                <h1>ここは管理トップです</h1>
        </OuterFrame>
        </>
    );
};
export default Top;