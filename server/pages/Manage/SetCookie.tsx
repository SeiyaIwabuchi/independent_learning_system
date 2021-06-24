import { GetServerSideProps } from "next";
import SessionIdValidater from "../../utils/SessionIdValidater";
import router from "next/router"
import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import OuterFrame from "../../components/OuterFrame";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const sessionIdByQueryParam = context.query.sessionId as string;
    const validatedSessionId = await SessionIdValidater(context,sessionIdByQueryParam);
    const goto = context.query.goto as string;
    context.res.setHeader("Set-Cookie",`sessionId=${validatedSessionId};Path=${"/"}`);
    return {
        props:{
            goto : goto
        }
    }
};

const SetCookie = (props : {goto : string}) => {
    useEffect(() => {
        router.push(props.goto);
    });
    return (
        <OuterFrame appbar={{title:"redirecting"}} snackbar={{}}>
            <Typography variant="body1">redirecting ...</Typography>
        </OuterFrame>
    );
};
export default SetCookie;