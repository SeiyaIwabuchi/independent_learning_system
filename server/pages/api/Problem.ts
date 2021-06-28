import { NextApiRequest, NextApiResponse } from "next";
import { UserForm } from "../../form_schemas/ts/UserForm";
import db from "../../models";
import SessionIdValidater from "../../utils/SessionIdValidater";
import crypto from "crypto";
import { Op } from "sequelize";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if(await SessionIdValidater(undefined,req.cookies.sessionId) != `Unauthorised`){
        console.log(req.body);
        if(req.method == "POST"){
            const user : UserForm = JSON.parse(req.body);
            // 登録する処理
            const password = crypto.createHash("sha256")
            .update(user.name + new Date().getTime(), "utf8")
            .digest("hex").slice(0,6);
            await db.t_users.create({
                name : user.name,
                password : password
            })
            .then((r) => {
            res.json({dummy : "dummy"});
        })
        }else if(req.method == "PUT"){
            const user : UserForm = JSON.parse(req.body);
            // 更新する処理
            // 更新対象のレコードを取得する
            await db.t_users.findOne({
                where : {
                    id : user.id
                }
            }).then((r)=>{
                r!.name = user.name;
                r!.save();
            });
            res.json({dummy : "dummy"});
        }else if(req.method == "DELETE"){
            const user : UserForm[] = JSON.parse(req.body);
            // 削除する処理
            //削除対象のレコードを取得する
            await db.t_users.findAll({
                where : {
                    id : {
                        [Op.in] : user.map((r) => r.id)
                    }
                }
            }).then((r) => {
                r!.forEach((rr) => {
                    rr.destroy();
                });
            });
            res.json({dummy : "dummy"});
        }
    }else{
        res.json({message : "Unauthorise"})
    }
}