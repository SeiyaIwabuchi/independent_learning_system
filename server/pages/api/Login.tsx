import { NextApiRequest, NextApiResponse } from "next";
import t_login_histories from "../../database_schemas/t_login_histories";
import t_sessions from "../../database_schemas/t_sessions";
import { LoginFormResponseShcema, LoginFormShcema } from "../../form_schemas/ts/LoginFormShcema";
import db from "../../models";
import { ISessionId } from "../../query_param_shemas/SessionId";
import LoginFormResponseShcemaForValidation from "../../form_schemas/LoginFormSchema.json";
import AjvValidater from "../../utils/AjvValidater";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "POST") {
        //レスポンスの設定
        let resjson: LoginFormResponseShcema = {
            sessionId: `Unauthorised`
        };
        const authInfo: LoginFormShcema = req.body;
        const authInfoValid = AjvValidater(LoginFormResponseShcemaForValidation.definitions.LoginFormShcema,authInfo);
        console.log(authInfo,authInfoValid);
        if (res && authInfoValid) {
            // ログイン試行履歴に追加
            const login_history: t_login_histories = {
                user_name: authInfo.name,
                trial_date: new Date()
            };
            const login_history_model = await db.t_login_histories.create(login_history);

            //ユーザの照会
            let user_model =
                await db.t_users.findOne({
                    where: authInfo
                });
            //ユーザが存在する場合
            if (user_model != null) {
                // sessionIdの生成取得
                const sessionId: t_sessions = {
                    user_id: user_model.id,
                    login_history_id: login_history_model.id
                }
                const sessionId_model =
                    await db.t_sessions.create(sessionId);
                // レスポンスにセッションIDを設定
                resjson.sessionId = `${sessionId_model.id}`;
                res.status(200).json(resjson);
            } else {
                //未認証応答
                res.status(401).json(resjson);
            }
        }else{
            //未認証応答
            res.status(401).json(resjson);
        }
    } else if (req.method == "DELETE") {
        if (res) {
            const resjson = {
                result: "ok"
            }
            const authInfo: ISessionId = req.body;
            // t_sessoinsから該当のセッションIDのレコードを削除する。
            const sessionId_model =
                await db.t_sessions.findByPk(authInfo.sessionId);
            if (sessionId_model == null) {
                resjson.result = "ng";
            }
            sessionId_model?.destroy();
            res.status(200).json(resjson);
        }
    }
};