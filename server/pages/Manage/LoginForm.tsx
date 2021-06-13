import { Typography, Button, InputLabel, OutlinedInput, FormControl } from "@material-ui/core";
import React, { useState } from "react";
import OuterFrame from "../../components/OuterFrame";
import router from "next/router";
import Form from "../../components/Form";
import LoginFormSchema_ from "../../form_schemas/LoginFormSchema.json";
import { LoginFormResponseShcema } from "../../form_schemas/ts/LoginFormShcema";
import { SessionId } from "../../query_param_shemas/SessionId";

const LoginFormSchema : any = LoginFormSchema_.definitions.LoginFormShcema;

let LoginForm = () => {
    const appbar = {
        title: "ログイン",
        rightButton: <></>,
        leftButton: <Button onClick={() => {router.back()}}>戻る</Button>
    }
    const [snackbarState,setSnackbarState] = useState(false);
    const [snackbarMsg,setSnackbarMsg] = useState("");
    const [userName,setUserName] = useState("");
    const [userPassword,setUserPassword] = useState("");
    const snackbar = {
        state:snackbarState,
        setState:setSnackbarState,
        msg:snackbarMsg
    }
    const [formData, setFormData] = useState({});
    return (
            <OuterFrame appbar={appbar} snackbar={snackbar}>
                <div>
                    <Form 
                        schema={LoginFormSchema} 
                        dataDest="/api/Login"
                        onApiRes={ (json : LoginFormResponseShcema) => {
                            if(json.sessionId != "invalid user"){
                                localStorage.setItem("sessionId",json.sessionId);
                                router.push(`/Manage/Top?${SessionId(json)}`);
                            }else{
                                setSnackbarMsg("ログインに失敗しました。ユーザ名またはパスワードが間違っています。");
                                setSnackbarState(true);                            }
                        }}
                        onApiError={(err) => {
                            console.log(err);
                        }}
                    />
                </div>
            </OuterFrame>
    )
};

export default LoginForm;