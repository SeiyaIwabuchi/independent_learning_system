import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Form from "../../../components/Form";
import ManagementCommon, { LAYOUT_TYPE } from "../../../components/ManagementCommon";
import db from "../../../models";
import SessionIdValidater from "../../../utils/SessionIdValidater";
import SubjectAddFormSchema from "../../../form_schemas/SubjectAddFormShcema.json";
import router from "next/router";
import { SubjectForm } from "../../../form_schemas/ts/SubjectForm";
import { SubjectFormUtil } from "../../../utils/SubjectFormUtil";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const hashByQueryParam = context.query.hash as string
    let subject = SubjectFormUtil.create();
    db.t_subjects.findOne(
        {
            where : {
                hash : hashByQueryParam
            }
        }
    ).then((r) => {
        subject.id = r!.id;
        subject.hash = r!.hash;
        subject.name = r!.name;
        subject.description = r!.description;
    });
    return {
        props: {
            sessionId: await SessionIdValidater(context),
            subject : subject
        }
    }
};

interface IProps{
    sessionId : string,
    subject : SubjectForm
}

const Edit = (props : IProps) => {
    const form = useState(props.subject);
    return (
        <ManagementCommon 
            pageTitle="教科編集" 
            pageLayoutType={LAYOUT_TYPE.EDIT} 
            sessionId={props.sessionId} 
            onRightButtonClicked={() => {
                router.push(`/Manage/Subject/List`);
        }}>
            <Form
            schema={SubjectAddFormSchema.definitions.SubjectAddFormShcema}
            onSubmit={
                async () => {
                    await fetch("/api/Subject",{
                        method : "put",
                        body : JSON.stringify(form[0])
                    }).then(() => {
                        router.push(`/Manage/Subject/List`);
                    }).catch((err) => {
                        alert(err);
                        router.push(`/Manage/Subject/List`);
                    });
                }
            }
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