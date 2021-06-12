import { Typography, Button, InputLabel, OutlinedInput, FormControl } from "@material-ui/core";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import OuterFrame from "../../components/OuterFrame";
import router from "next/router";

let LoginForm = () => {
    const appbar = {
        title: "ログイン",
        rightButton: <></>,
        leftButton: <></>
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
    const loginUser = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await fetch("/api/Login",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                userName:userName,
                userPassword:userPassword
            })
        }).then( res => res.json())
        .then( (res:{sessionId:string}) => {
            localStorage.setItem("sessionId",res.sessionId);
            setSnackbarMsg(`Hello ${userName}`);
            setSnackbarState(true);
            router.push("/Manage/Top");
        })
        .catch( err => {
            console.log(`${err}`);
            setSnackbarMsg(`${err}`);
            setSnackbarState(true);
        });
    };
    return (
            <OuterFrame appbar={appbar} snackbar={snackbar}>
                <div>
                    <form onSubmit={loginUser}>
                    {/* <form action="/Manage/Login" method="post"> */}
                        <Typography variant="h4">
                            ログイン
                        </Typography>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="component-outlined">ユーザ名</InputLabel>
                            <OutlinedInput type="text" name="userName" value={userName} onChange={event => setUserName(event.target.value)} required/>
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="component-outlined">パスワード</InputLabel>
                            <OutlinedInput type="password" name="userPassword" value={userPassword} onChange={event => setUserPassword(event.target.value)} required/>
                        </FormControl>

                        <Button type="submit" variant="contained" color="primary">ログイン</Button>
                    </form>
                </div>
            </OuterFrame>
    )
};

export default LoginForm;