import { GetServerSideProps } from "next";
import SessionIdValidater from "../../utils/SessionIdValidater";
import router from "next/router"
import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import db from "../../models";
import OuterFrame from "../../components/OuterFrame";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const validatedSessionId = await SessionIdValidater(context);
    const goto = context.query.goto as string;
    const sessionId_model =
        await db.t_sessions.findByPk(validatedSessionId);
    sessionId_model?.destroy();
    context.res.setHeader("Set-Cookie",`sessionId=${"Unauthorised"};Path=${"/"};Expires=${new Date().toUTCString()}`);
    return {
        props: {
            goto: goto
        }
    }
};

const Logout = (props: { goto: string }) => {
    useEffect(() => {
        router.push(props.goto);
    });
    return (
        <OuterFrame appbar={{title:"redirecting"}} snackbar={{}}>
            <Typography variant="body1">redirecting ...</Typography>
        </OuterFrame>
    );
};
export default Logout;