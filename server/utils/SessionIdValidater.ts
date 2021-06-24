import { GetServerSideProps, GetServerSidePropsContext } from "next";
import db from "../models";

const SessionIdValidater = async ( context : GetServerSidePropsContext,sessionId? : string) => {
    const sessionId_ = sessionId || context.req.cookies.sessionId as string;
    console.log(context.req.cookies );
    const session_model = 
        await db.t_sessions.findByPk(sessionId_);
    const resSessionId = session_model == null ? "Unauthorised" : `${session_model.id}`;
    return resSessionId;
};

export default SessionIdValidater;