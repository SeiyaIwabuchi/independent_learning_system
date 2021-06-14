import { NextApiRequest, NextApiResponse } from "next";
import { LoginFormResponseShcema, LoginFormShcema } from "../../form_schemas/ts/LoginFormShcema";
import db from "../../models";
import { ISessionId } from "../../query_param_shemas/SessionId";

export default (req:NextApiRequest,res:NextApiResponse) => {
    if(res){
        const authInfo :ISessionId = req.body;
        // t_sessoinsから該当のセッションIDのレコードを削除する。
        // db.t_users.findOne({
        //     where : authInfo
        // })
        // .then((model) => {
        //     let resjson : LoginFormResponseShcema = {
        //         sessionId:`${authInfo.name}${authInfo.password}`
        //     };
        //     if(model == null){
        //         resjson.sessionId = "invalid user";
        //         res.status(401).json(resjson);
        //     }else{
        //         res.status(200).json(resjson);
        //     }
        // })
        let resjson : {result : string} = {
            result: "ok"
        };
        res.status(200).json(resjson);
    }
};