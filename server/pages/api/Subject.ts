import { NextApiRequest, NextApiResponse } from "next";
import { SubjectForm } from "../../form_schemas/ts/SubjectForm";
import db from "../../models";
import SessionIdValidater from "../../utils/SessionIdValidater";
import crypto from "crypto";
import { Op } from "sequelize";
import AjvValidater from "../../utils/AjvValidater";
import SubjectFormJson from "../../form_schemas/SubjectForm.json";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if(await SessionIdValidater(undefined,req.cookies.sessionId) != `Unauthorised`){
        let isValid = false;
        if(req.method == "POST"){
            const subject : SubjectForm = JSON.parse(req.body);
            isValid = await AjvValidater(SubjectFormJson.definitions.SubjectForm_POST,subject);
        }else if(req.method == "PUT"){
            const subject : SubjectForm = JSON.parse(req.body);
            isValid = await AjvValidater(SubjectFormJson.definitions.SubjectForm_PUT,subject);
        }else if(req.method == "DELETE"){
            const subject : SubjectForm[] = JSON.parse(req.body);
            isValid = await AjvValidater(SubjectFormJson.definitions.SubjectForm_DELETE,subject);
        }

        if(req.method == "POST"){
            const subject : SubjectForm = JSON.parse(req.body);
            // 登録する処理
            subject.hash = crypto.createHash("sha256")
            .update(subject.name + new Date().getTime(), "utf8")
            .digest("hex");
            await db.t_subjects.create(subject)
            .then((r) => {
                res.json(r);
            })
        }else if(req.method == "PUT"){
            const subject : SubjectForm = JSON.parse(req.body);
            // 更新する処理
            // 更新対象のレコードを取得する
            await db.t_subjects.findOne({
                where : {
                    hash : subject.hash
                }
            }).then((r)=>{
                r!.name = subject.name;
                r!.description = subject.description;
                r!.save();
            });
            res.json(subject);
        }else if(req.method == "DELETE"){
            const subject : SubjectForm[] = JSON.parse(req.body);
            // 削除する処理
            //削除対象のレコードを取得する
            await db.t_subjects.findAll({
                where : {
                    hash : {
                        [Op.in] : subject.map((r) => r.hash)
                    }
                }
            }).then((r) => {
                r!.forEach((rr) => {
                    rr.destroy();
                });
            });
            res.json(subject);
        }
    }else{
        res.json({message : "Unauthorise"})
    }
}