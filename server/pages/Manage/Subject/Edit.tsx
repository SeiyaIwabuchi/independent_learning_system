import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Form from "../../../components/Form";
import ManagementCommon, { LAYOUT_TYPE } from "../../../components/ManagementCommon";
import db from "../../../models";
import SessionIdValidater from "../../../utils/SessionIdValidater";
import SubjectAddFormSchema from "../../../form_schemas/SubjectAddFormShcema.json";
import { SessionId } from "../../../query_param_shemas/SessionId";
import router from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const sessionId = context.query.sessionId as string;
    const subjectName = context.query.name as string
    const session_model =
        await db.t_sessions.findByPk(sessionId);
    const resSessionId = session_model == null ? "Unauthorised" : `${session_model.id}`;
    return {
        props: {
            sessionId: await SessionIdValidater(context),
            name : subjectName
        }
    }
};

interface IProps{
    sessionId : string,
    name : string
}

const Edit = (props : IProps) => {
    // title: string; leftButton?: Element | undefined; rightButton?: Element | undefined;
    const appbar = {
        title : "教科追加"
    }
    const subjectName = useState({name:props.name});
    return (
        <ManagementCommon pageTitle="教科編集" pageLayoutType={LAYOUT_TYPE.EDIT} sessionId={props.sessionId} onRightButtonClicked={() => {
            router.push(`/Manage/Subject/List?${SessionId({sessionId: props.sessionId})}`);
        }}>
            <Form
            schema={SubjectAddFormSchema.definitions.SubjectAddFormShcema}
            dataDest="#"
            submitButtonName="完了"
            onApiRes={() => {
                router.push(`/Manage/Subject/List?${SessionId({sessionId: props.sessionId})}`);
            }}
            onApiError={() => {
                router.push(`/Manage/Subject/List?${SessionId({sessionId: props.sessionId})}`);
            }}
            formData={subjectName[0]}
            onChange={(event) => {
                console.log(event.name)
                subjectName[1]({name : event.name});
            }}
            >
            </Form>
        </ManagementCommon>
    )
};

export default Edit;