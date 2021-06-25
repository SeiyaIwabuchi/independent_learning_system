import { GetServerSideProps, GetServerSidePropsContext } from "next";
import db from "../models";

const SessionIdValidater = async ( context? : GetServerSidePropsContext,sessionId? : string) => {
    let sessionId_ : string;
    if(context){
        sessionId_ = context.req.cookies.sessionId as string;
    }else{
        sessionId_ = sessionId!;
    }
    const session_model = 
        await db.t_sessions.findByPk(sessionId_);
    const resSessionId = session_model == null ? "Unauthorised" : `${session_model.id}`;
    return resSessionId;
};

export default SessionIdValidater;