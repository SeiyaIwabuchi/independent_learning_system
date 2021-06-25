import { NextApiRequest, NextApiResponse } from "next";
import { SubjectForm } from "../../form_schemas/ts/SubjectForm";
import db from "../../models";
import SessionIdValidater from "../../utils/SessionIdValidater";
import crypto from "crypto";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if(await SessionIdValidater(undefined,req.cookies.sessionId) != `Unauthorised`){
        const subject : SubjectForm = req.body;
        if(req.method == "POST"){
            // 登録する処理
            subject.hash = crypto.createHash("sha256")
            .update(subject.name + new Date().getTime(), "utf8")
            .digest("hex");
            await db.t_subjects.create(subject)
            .then((r) => {
                res.json(r);
            })
        }else if(req.method == "PUT"){
            // 更新する処理
        }else if(req.method == "DELETE"){
            // 削除する処理
        }
    }else{
        res.json({message : "Unauthorise"})
    }
}