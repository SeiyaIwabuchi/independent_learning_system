import { NextApiRequest, NextApiResponse } from "next";
import { LoginFormResponseShcema, LoginFormShcema } from "../../form_schemas/ts/LoginFormShcema";
import db from "../../models";

export default (req:NextApiRequest,res:NextApiResponse) => {
    if(res){
        const authInfo :LoginFormShcema = req.body;
        // データベースで照合する。
        db.t_users.findOne({
            where : authInfo
        })
        .then((model) => {
            let resjson : LoginFormResponseShcema = {
                sessionId:`${authInfo.name}${authInfo.password}`
            };
            if(model == null){
                resjson.sessionId = "invalid user";
                res.status(401).json(resjson);
            }else{
                res.status(200).json(resjson);
            }
        })
    }
};