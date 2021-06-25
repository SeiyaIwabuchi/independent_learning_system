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
    const subject = useState(props.subject);
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
            dataDest="#"
            submitButtonName="完了"
            onApiRes={() => {
                router.push(`/Manage/Subject/List`);
            }}
            onApiError={() => {
                router.push(`/Manage/Subject/List`);
            }}
            formData={subject[0]}
            onChange={(event) => {
                console.log(event.name)
                subject[1](event);
            }}
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