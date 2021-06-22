import { Button, IconButton, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import router from "next/router";
import React from "react";
import OuterFrame from "../../../components/OuterFrame";
import SubjectMenuList, { IElemetPorps } from "../../../components/SubjectMenuList";
import db from "../../../models";
import { ISessionId, SessionId } from "../../../query_param_shemas/SessionId";
import SessionIdValidater from "../../../utils/SessionIdValidater";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ManagementCommon, { LAYOUT_TYPE } from "../../../components/ManagementCommon";

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

const List = (props: ISessionId) => {


    const MenuList: IElemetPorps[] = [
        {
            primaryText: "テスト理論",
            secondaryText: "Junitを用いたJavaのテスト",
            sessionId:props.sessionId
        },
        {
            primaryText: "人工知能",
            secondaryText: "ExcelとPythonを用いた機械学習超入門",
            sessionId:props.sessionId
        },
        {
            primaryText: "Python",
            secondaryText: "Pythonの基礎学習",
            sessionId:props.sessionId
        },
    ];

    const snackbar = {

    };

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
        // .catch((err) => {
        //     console.log(err);
        //     setSnackbarMsg("ログアウトに失敗しました。");
        //     setSnackbarState(true);
        // });
    };

    const appbar = {
        title: "管理トップ",
        rightButton: <Button variant="contained" onClick={onLogout}>ログアウト</Button>,
        leftButton: <IconButton onClick={() => router.back()}><ArrowBackIosIcon /></IconButton>
    }

    return (
        <>
            <ManagementCommon 
            pageTitle="教科管理" 
            pageLayoutType={LAYOUT_TYPE.MENU}
            sessionId={props.sessionId}
            AddUrl="/Manage/Subject/Add"
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
                    <Typography variant="h4" align="center">教科管理</Typography>
                    <Typography variant="subtitle1" align="center">教科の追加、変更、削除ができます。</Typography>
                    <Typography variant="subtitle1" align="center">以下、教科一覧です。</Typography>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "10px"
                    }}>
                    <SubjectMenuList menuList={MenuList} />
                </div>
            </ManagementCommon>
        </>
    )
};

export default List;