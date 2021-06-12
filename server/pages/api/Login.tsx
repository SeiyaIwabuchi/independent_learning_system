import { NextApiRequest, NextApiResponse } from "next";

export default (req:NextApiRequest,res:NextApiResponse) => {
    if(res){
        console.log(req.body);
        const authInfo = req.body;
        res.json({
            sessionId:`${authInfo.userName}${authInfo.userPassword}`
        });
    }
};