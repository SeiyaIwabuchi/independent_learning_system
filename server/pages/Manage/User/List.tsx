import { MenuItem, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import router from "next/router";
import React, { useState } from "react";
import { ISessionId } from "../../../query_param_shemas/SessionId";
import SessionIdValidater from "../../../utils/SessionIdValidater";
import ManagementCommon, { LAYOUT_TYPE } from "../../../components/ManagementCommon";
import db from "../../../models";
import { UserForm } from "../../../form_schemas/ts/UserForm";
import UserMenuList from "../../../components/UserMenuList";
import { ListItemText } from "@material-ui/core";
import t_sessions from "../../../database_schemas/t_sessions";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const sessionId = await SessionIdValidater(context);
    let users: UserForm[] = [];
    let currentUserName = "";
    await db.t_sessions.findOne({
        where: {
            id: sessionId
        },
        include: [{
            model: db.t_users,
            required: true
        }],
        raw: true
    })
        .then((e: t_sessions & { [key: string]: any } | null) => {
            currentUserName = e!["t_user.name"];
        });
    await db.t_users.findAll()
        .then((users_) => {
            for (let r of users_) {
                users.push(
                    {
                        id: r.id,
                        name: r.name,
                    }
                );
            }
        });
    return {
        props: {
            sessionId: sessionId,
            users: users,
            currentUserName: currentUserName
        }
    }
};

const List = (props: ISessionId & { users: UserForm[], currentUserName:string }) => {

    const deleteList = useState<number[]>([]);

    return (
        <>
            <ManagementCommon
                pageTitle="管理ユーザの管理"
                pageLayoutType={LAYOUT_TYPE.MENU}
                sessionId={props.sessionId}
                AddUrl="/Manage/User/Add"
                MenuList={[
                    <MenuItem onClick={() => {
                        router.push(`/Manage/User/Delete?list=${JSON.stringify(deleteList[0])}`);
                    }} key={"DeleteSelectedItem"}>
                        <ListItemText primary="選択ユーザ削除"></ListItemText>
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
                    <Typography variant="h4" align="center">管理ユーザの管理</Typography>
                    <Typography variant="subtitle1" align="center">管理ユーザの追加、変更、削除ができます。</Typography>
                    <Typography variant="subtitle1" align="center">以下、ユーザです。</Typography>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "10px"
                    }}>
                    <UserMenuList
                    menuList={props.users} 
                    deleteList={deleteList} 
                    currentUserName={props.currentUserName}
                    />
                </div>
            </ManagementCommon>
        </>
    )
};

export default List;