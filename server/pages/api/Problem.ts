import { NextApiRequest, NextApiResponse } from "next";
import db from "../../models";
import SessionIdValidater from "../../utils/SessionIdValidater";
import { Op } from "sequelize";

type problem_UPDATE = {
    [key: string]:any;
    'hash'? : string;
    'problem_type'? : number;
    'answer_type'? : number;
    'problem_body'? : string;
    'choices' : {
        id: number,
        problem_id: number,
        choice_text: string,
        collect_flag: boolean,
        image_id: string,
    }[]
};

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if(await SessionIdValidater(undefined,req.cookies.sessionId) != `Unauthorised`){
        const problem: problem_UPDATE = JSON.parse(req.body);
        if(req.method == "POST"){
        }else if(req.method == "PUT"){
            // update t_problem
            let problemId:number;
            await db.t_problems.findOne({
                where : {
                    hash: problem.hash!
                }
            })
            .then(e => {
                e!.problem_body = problem.problem_body!;
                e!.problem_type = problem.problem_type!;
                e!.answer_type = problem.answer_type!;
                e!.save();
                problemId = e!.id;
            });
            for(let e of problem.choices){
                await db.t_choices.findOne({
                    where: {id: e.id}
                })
                .then(async rec => {
                    if(rec){
                        rec.choice_text = e.choice_text;
                        rec.collect_flag = e.collect_flag;
                        rec.save();
                    }else{
                        await db.t_choices.create({
                            choice_text: e.choice_text,
                            collect_flag: e.collect_flag,
                            problem_id: problemId
                        });
                    }
                })
            }
            const choiceIdList = problem.choices.map(r => r.id);
            await db.t_choices.destroy({
                where: {
                    id: {
                        [Op.notIn]: choiceIdList
                    },
                    problem_id: problemId!
                }
            });
        }else if(req.method == "DELETE"){
        }
        res.json({message:"dummy"});
    }else{
        res.json({message : "Unauthorise"})
    }
}