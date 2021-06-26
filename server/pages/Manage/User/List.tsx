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

export const getServerSideProps: GetServerSideProps = async (context) => {
    let users : UserForm[] = [];
    await db.t_users.findAll()
    .then((users_) => {
        for(let r of users_){
            users.push(
                {
                    id : r.id,
                    name : r.name,
                }
            );
        }
    });
    return {
        props: {
            sessionId: await SessionIdValidater(context),
            users : users
        }
    }
};

const List = (props: ISessionId & {users : UserForm[]}) => {
    
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
                    <UserMenuList menuList={props.users} deleteList={deleteList}/>
                </div>
            </ManagementCommon>
        </>
    )
};

export default List;