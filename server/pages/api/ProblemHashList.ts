import { NextApiRequest, NextApiResponse } from "next";
import db, { t_subjects } from "../../models";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const subjectHash = req.query.subjectHash as string;
    console.log(subjectHash);
    if(req.method == "GET"){
        await db.t_problems.findAll({
            attributes:["hash"],
            where:{
                "$t_subject.hash$": subjectHash
            },
            include:[{
                model: t_subjects,
            }],
            order: ["id"]
        })
        .then(
            e => res.status(200).json(e.map(ee => ee.hash))
        )
    }
}