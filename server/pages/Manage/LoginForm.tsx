import { Typography, Button, InputLabel, OutlinedInput, FormControl } from "@material-ui/core";
import React, { useState } from "react";
import OuterFrame from "../../components/OuterFrame";
import router from "next/router";
import Form from "../../components/Form";
import LoginFormSchema_ from "../../form_schemas/LoginFormSchema.json";
import { LoginFormResponseShcema } from "../../form_schemas/ts/LoginFormShcema";
import { SessionId } from "../../query_param_shemas/SessionId";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from "@material-ui/core";
import { useEffect } from "react";

const LoginFormSchema: any = LoginFormSchema_.definitions.LoginFormShcema;

let LoginForm = () => {
    const appbar = {
        title: "ログイン",
        rightButton: <></>,
        leftButton: <IconButton onClick={()=> router.back()}><ArrowBackIosIcon/></IconButton>
    }
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const snackbar = {
        state: snackbarState,
        setState: setSnackbarState,
        msg: snackbarMsg
    };
    useEffect( () => {
        // localStorageにsessionIdがある状態でログインフォームアクセスしたとき、
        //sessionIdが有効な時はそのまま管理トップに遷移する。
        console.log();
    });
    return (
        <OuterFrame appbar={appbar} snackbar={snackbar}>
            <div>
                <Form
                    action="/api/Login"
                    schema={LoginFormSchema}
                    submitButtonName="ログイン"
                    dataDest="/api/Login"
                    onApiRes={(json: LoginFormResponseShcema) => {
                        if (json.sessionId != "Unauthorised") {
                            localStorage.setItem("sessionId", json.sessionId);
                            router.push(`/Manage/Top?${SessionId(json)}`);
                        } else {
                            setSnackbarMsg("ログインに失敗しました。ユーザ名またはパスワードが間違っています。");
                            setSnackbarState(true);
                        }
                    }}
                    onApiError={(err) => {
                        console.log(err);
                    }}
                    name = "loginForm"
                    id = "loginForm"
                />
            </div>
        </OuterFrame>
    )
};

export default LoginForm;