import { NextApiRequest, NextApiResponse } from "next";
import { UserForm } from "../../form_schemas/ts/UserForm";
import db from "../../models";
import SessionIdValidater from "../../utils/SessionIdValidater";
import crypto from "crypto";
import { Op } from "sequelize";
import AjvValidater from "../../utils/AjvValidater";
import UserFormJson from "../../form_schemas/UserForm.json";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (await SessionIdValidater(undefined, req.cookies.sessionId) != `Unauthorised`) {
        let isValid = false;
        if (req.method == "POST") {
            const user: UserForm = JSON.parse(req.body);
            isValid = await AjvValidater(UserFormJson.definitions.UserForm_POST,user);
        } else if (req.method == "PUT") {
            const user: UserForm = JSON.parse(req.body);
            isValid = await AjvValidater(UserFormJson.definitions.UserForm_PUT,user);
        } else if (req.method == "DELETE") {
            const user: UserForm[] = JSON.parse(req.body);
            isValid = await AjvValidater(UserFormJson.definitions.UserForm_DELETE,user);
        }
        if (isValid) {
            if (req.method == "POST") {
                const user: UserForm = JSON.parse(req.body);
                // 登録する処理
                const password = crypto.createHash("sha256")
                    .update(user.name + new Date().getTime(), "utf8")
                    .digest("hex").slice(0, 6);
                await db.t_users.create({
                    name: user.name,
                    password: password
                })
                    .then((r) => {
                        res.json({ name: r.name });
                    })
            } else if (req.method == "PUT") {
                const user: UserForm = JSON.parse(req.body);
                // 更新する処理
                // 更新対象のレコードを取得する
                await db.t_users.findOne({
                    where: {
                        id: user.id
                    }
                }).then((r) => {
                    r!.name = user.name;
                    r!.save();
                });
                res.json(user);
            } else if (req.method == "DELETE") {
                const user: UserForm[] = JSON.parse(req.body);
                // 削除する処理
                //削除対象のレコードを取得する
                await db.t_users.findAll({
                    where: {
                        id: {
                            [Op.in]: user.map((r) => r.id)
                        }
                    }
                }).then((r) => {
                    r!.forEach((rr) => {
                        rr.destroy();
                    });
                });
                res.json(user);
            }
        }else{ // バリデーションに失敗
            res.status(400);
            res.json({ message: "Illegal data" });
        }
    } else { // 認証に失敗
        res.status(401);
        res.json({ message: "Unauthorise" })
    }
}