import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Form from "../../../components/Form";
import ManagementCommon, { LAYOUT_TYPE } from "../../../components/ManagementCommon";
import SessionIdValidater from "../../../utils/SessionIdValidater";
import SubjectAddFormSchema from "../../../form_schemas/SubjectAddFormShcema.json";
import router from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            sessionId: await SessionIdValidater(context)
        }
    }
};

interface IProps{
    sessionId : string,
}

const Add = (props : IProps) => {
    // title: string; leftButton?: Element | undefined; rightButton?: Element | undefined;
    const onAddButtonClicked = async () => {
            await fetch(`${process.env.basePath}/api/Subject`,{
                method : "post",
                body : JSON.stringify(form[0])
            }).then(() => {
                router.push(`/Manage/Subject/List`);
            }).catch((err) => {
                alert(err);
                router.push(`/Manage/Subject/List`);
            });
    };

    const form = useState({name : "", description : ""});
    return (
        <ManagementCommon 
        pageTitle="教科追加" 
        pageLayoutType={LAYOUT_TYPE.EDIT} 
        sessionId={props.sessionId}
        onRightButtonClicked={ onAddButtonClicked }
        >
            <Form
            schema={SubjectAddFormSchema.definitions.SubjectAddFormShcema}
            onSubmit={ onAddButtonClicked }
            onChange={(e)=>{form[1](e)}}
            formData={form[0]}
            submitButtonName="追加"
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

export default Add;