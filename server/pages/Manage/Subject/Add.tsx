import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
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
    const session_model =
        await db.t_sessions.findByPk(sessionId);
    const resSessionId = session_model == null ? "Unauthorised" : `${session_model.id}`;
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
    const appbar = {
        title : "教科追加"
    }

    return (
        <ManagementCommon pageTitle="教科追加" pageLayoutType={LAYOUT_TYPE.EDIT} sessionId={props.sessionId} disableRightButton>
            <Form
            schema={SubjectAddFormSchema.definitions.SubjectAddFormShcema}
            dataDest="#"
            submitButtonName="追加"
            onApiRes={() => {
                router.push(`/Manage/Subject/List?${SessionId({sessionId: props.sessionId})}`);
            }}
            onApiError={() => {
                router.push(`/Manage/Subject/List?${SessionId({sessionId: props.sessionId})}`);
            }}
            >
            </Form>
        </ManagementCommon>
    )
};

export default Add;