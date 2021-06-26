import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Form from "../../../components/Form";
import ManagementCommon, { LAYOUT_TYPE } from "../../../components/ManagementCommon";
import db from "../../../models";
import SessionIdValidater from "../../../utils/SessionIdValidater";
import UserAddFormSchema from "../../../form_schemas/UserAddFormShcema.json";
import router from "next/router";
import { UserForm } from "../../../form_schemas/ts/UserForm";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const idByQueryParam = context.query.id as string
    let user : UserForm = {id : null!, name : null!};
    await db.t_users.findOne(
        {
            where : {
                id : idByQueryParam
            }
        }
    ).then((r) => {
        user.id = r!.id;
        user.name = r!.name;
    });
    return {
        props: {
            sessionId: await SessionIdValidater(context),
            user : user!
        }
    }
};

interface IProps{
    sessionId : string,
    user : UserForm
}

const Edit = (props : IProps) => {
    const form = useState(props.user);
    const onCommitButton = async () => {
        await fetch("/api/User",{
            method : "put",
            body : JSON.stringify(form[0])
        }).then(() => {
            router.push(`/Manage/User/List`);
        }).catch((err) => {
            alert(err);
            router.push(`/Manage/User/List`);
        });
    };
    return (
        <ManagementCommon 
            pageTitle="管理ユーザ編集" 
            pageLayoutType={LAYOUT_TYPE.EDIT} 
            sessionId={props.sessionId} 
            onRightButtonClicked={ onCommitButton }>
            <Form
            schema={UserAddFormSchema.definitions.UserAddFormShcema}
            onSubmit={ onCommitButton }
            onChange={(e)=>{form[1](e)}}
            formData={form[0]}
            submitButtonName="完了"
            uiSchema={{
                description:{
                    "ui:widget": "textarea"
                }
            }}
            >
            </Form>
        </ManagementCommon>
    )
};

export default Edit;