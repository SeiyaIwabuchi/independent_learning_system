import { NextApiRequest, NextApiResponse } from "next";
import db, { t_problems } from "../../models";
import SessionIdValidater from "../../utils/SessionIdValidater";
import { Op } from "sequelize";
import crypto from "crypto";
import AjvValidater from "../../utils/AjvValidater";
import problemFormJson from "../../form_schemas/ProblemForm.json";
import ajv from "ajv";



type problem = {
    [key: string]: any;
    'hash'?: string;
    'problem_type'?: number;
    'answer_type'?: number;
    'problem_body'?: string;
    'subjectHash'?: string;
    'problemImageURL'?: string;
    'choices': {
        id: number,
        problem_id: number,
        choice_text: string,
        collect_flag: boolean,
        image_id: string,
    }[]
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Content-Type", "application/json");
    if (await SessionIdValidater(undefined, req.cookies.sessionId) != `Unauthorised`) {
        let validate: any;
        let isValid = false;
        if (req.method == "POST") {
            let problem: problem
            if (req.headers["content-type"] == "application/json") {
                problem = req.body as problem;
            } else {
                problem = JSON.parse(req.body);
            }
            validate = new ajv().compile(problemFormJson.definitions.problem_POST);
            isValid = await validate(problem);
            if (!isValid) {
                res.status(400).json({ "error": "failure to validate json", "shema": problemFormJson.definitions.problem_POST });
                return;
            }
            isValid &&= (problem.problem_body!.length > 0 || problem.problem_type! == 1);
            problem.choices.forEach(e => { isValid &&= e.choice_text.length > 0 });
        } else if (req.method == "PUT") {
            let problem: problem
            if (req.headers["content-type"] == "application/json") {
                problem = req.body as problem;
            } else {
                problem = JSON.parse(req.body);
            }
            validate = new ajv().compile(problemFormJson.definitions.problem_PUT);
            isValid = await validate(problem);
            if (!isValid) {
                res.status(400).json({ "error": "failure to validate json", "valudate error":validate.errors,"recived" : problem, "shema": problemFormJson.definitions.problem_PUT });
                // console.log(validate.errors);
                // console.log(problem);
                return;
            }
            isValid &&= (problem.problem_body!.length > 0 || problem.problem_type! == 1);
            problem.choices.forEach(e => { isValid &&= e.choice_text.length > 0 });
        } else if (req.method == "DELETE") {
            let problemList: string[];
            if (req.headers["content-type"] == "application/json") {
                problemList = req.body as string[];
            } else {
                problemList = JSON.parse(req.body);
            }
            isValid = await AjvValidater(problemFormJson.definitions.problem_DELETE, problemList);
            if (!isValid) {
                res.status(400).json({ "error": "failure to validate json", "shema": problemFormJson.definitions.problem_DELETE });
                return;
            }
        }

        if (isValid) {
            let problem: problem;
            if (req.headers["content-type"] == "application/json") {
                problem = req.body as problem;
            } else {
                problem = JSON.parse(req.body);
            }
            if (req.method == "POST") {
                const hash = crypto.createHash("sha256")
                    .update(problem.problem_body! + new Date().getTime(), "utf8")
                    .digest("hex");
                let subject_id: number;
                await db.t_subjects.findOne({
                    where: {
                        hash: problem.subjectHash!
                    }
                }).then(e => subject_id = e!.id)
                    .catch(err => {
                        res.status(500).json({ "error": err });
                        console.log(err);
                    });
                let problemRec: t_problems;
                await db.t_problems.create({
                    id: null,
                    hash: hash,
                    subject_id: subject_id!,
                    problem_type: problem.problem_type!,
                    answer_type: problem.answer_type!,
                    problem_body: problem.problem_body,
                    problem_image_url: problem.problemImageURL
                }).then(r => problemRec = r)
                    .catch(err => {
                        res.status(500).json({ "error": err });
                        console.log(err);
                        throw err;
                    });
                await db.t_choices.bulkCreate(
                    problem.choices.map(e => {
                        return {
                            id: e.id,
                            problem_id: problemRec.id,
                            choice_text: e.choice_text,
                            collect_flag: e.collect_flag,
                            image_id: e.image_id
                        }
                    })
                ).catch(err => {
                    res.status(500).json({ "error": err });
                    console.log(err);
                    throw err;
                });
                res.status(200).json({ message: "ok" });
            } else if (req.method == "PUT") {
                // update t_problem
                let problemId: number;
                await db.t_problems.findOne({
                    where: {
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
                for (let e of problem.choices) {
                    await db.t_choices.findOne({
                        where: { id: e.id }
                    })
                        .then(async rec => {
                            if (rec) {
                                rec.choice_text = e.choice_text;
                                rec.collect_flag = e.collect_flag;
                                rec.save();
                            } else {
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
                res.status(200).json({ message: "ok" });
            } else if (req.method == "DELETE") {
                const problemList: string[] = JSON.parse(req.body);
                await db.t_problems.destroy({
                    where: {
                        hash: {
                            [Op.in]: problemList
                        }
                    }
                });
                res.status(200).json({ message: "ok" });
            }
        } else {
            res.status(400).json({
                error: validate!.errors || "validation falure",
                schema: problemFormJson
            });
        }
    } else {
        res.json({ message: "Unauthorise" })
    }
}