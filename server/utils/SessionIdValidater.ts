import { GetServerSideProps, GetServerSidePropsContext } from "next";
import db from "../models";

const SessionIdValidater = async ( context : GetServerSidePropsContext) => {
    const sessionId = context.query.sessionId as string;
    const session_model = 
        await db.t_sessions.findByPk(sessionId);
    const resSessionId = session_model == null ? "Unauthorised" : `${session_model.id}`;
    return resSessionId;
};

export default SessionIdValidater;