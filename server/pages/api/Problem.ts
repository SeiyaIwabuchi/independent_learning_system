import { NextApiRequest, NextApiResponse } from "next";
import { UserForm } from "../../form_schemas/ts/UserForm";
import db from "../../models";
import SessionIdValidater from "../../utils/SessionIdValidater";
import crypto from "crypto";
import { Op } from "sequelize";

type problem_UPDATE = {
    [key: string]:any;
    'problem_hash'? : string;
    'problemType'? : number;
    'choiceType'? : number;
    'problemBody'? : string;
    'choices' : {isCollect?: boolean,choiceText?: string}[]
};

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if(await SessionIdValidater(undefined,req.cookies.sessionId) != `Unauthorised`){
        const tproblem = JSON.parse(req.body);
        const re_isCollect_x = /isCollect_(\d+)/;
        const re_choicesText_X = /choicesText_(\d+)/;
        const problem: problem_UPDATE = {choices:[]};
        
        for(let key of Object.keys(tproblem)){
            let matchResult = key.match(re_isCollect_x);
            if(matchResult != null){
                tchoice.isCollect = tproblem.isCollect;
            }
            matchResult = key.match(re_choicesText_X);
            if(matchResult != null){
                tchoice.choiceText = tproblem.choiceText;
                problem.choices.push(tchoice);
            }
            problem[key] = tproblem[key];
        }
        console.log(problem);
        if(req.method == "POST"){
        }else if(req.method == "PUT"){
            // update t_problem
            // db.t_problems.findOne({
            //     where : {
            //         hash: 
            //     }
            // })
        }else if(req.method == "DELETE"){
        }
        res.json({message:"dummy"});
    }else{
        res.json({message : "Unauthorise"})
    }
}