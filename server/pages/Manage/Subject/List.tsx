import { Button, IconButton, MenuItem, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import router from "next/router";
import React, { useState } from "react";
import SubjectMenuList, { IElemetPorps } from "../../../components/SubjectMenuList";
import { ISessionId } from "../../../query_param_shemas/SessionId";
import SessionIdValidater from "../../../utils/SessionIdValidater";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ManagementCommon, { LAYOUT_TYPE } from "../../../components/ManagementCommon";
import db from "../../../models";
import { SubjectForm } from "../../../form_schemas/ts/SubjectForm";

export const getServerSideProps: GetServerSideProps = async (context) => {
    let subjects : SubjectForm[] = [];
    await db.t_subjects.findAll()
    .then((subjects_) => {
        for(let r of subjects_){
            subjects.push(
                {
                    hash : r.hash,
                    name : r.name,
                    description : r.description
                }
            );
        }
    });
    return {
        props: {
            sessionId: await SessionIdValidater(context),
            subjects : subjects
        }
    }
};

const List = (props: ISessionId & {subjects : SubjectForm[]}) => {

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
    };
    
    const deleteList = useState<string[]>([]);

    return (
        <>
            <ManagementCommon 
            pageTitle="教科管理" 
            pageLayoutType={LAYOUT_TYPE.MENU}
            sessionId={props.sessionId}
            AddUrl="/Manage/Subject/Add"
            MenuList={[
                <MenuItem onClick={() => {
                    router.push(`/Manage/Subject/Delete?list=${JSON.stringify(deleteList[0])}`);
                }}>
                    選択項目削除
                </MenuItem>
            ]}
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
                    <SubjectMenuList menuList={props.subjects} deleteList={deleteList}/>
                </div>
            </ManagementCommon>
        </>
    )
};

export default List;