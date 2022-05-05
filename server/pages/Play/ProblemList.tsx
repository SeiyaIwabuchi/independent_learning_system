import { Checkbox, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { List, ListItem } from "@material-ui/core";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { GetServerSideProps } from "next";
import router from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import OuterFrame from "../../components/OuterFrame";
import ReviewCommon from "../../components/ReviewCommon";
import { ProblemForm } from "../../form_schemas/ts/ProblemForm";
import { SubjectForm } from "../../form_schemas/ts/SubjectForm";
import db from "../../models";
import { dexieDb } from "../../models/dexie";
import SessionIdValidater from "../../utils/SessionIdValidater";

export const getServerSideProps: GetServerSideProps = async (context) => {
    let problems: ProblemForm[] = [];
    const subjectHash: string = context.query.subjectHash as string;
    let subjects: SubjectForm[] = [];
    await db.t_subjects.findAll()
        .then((subjects_) => {
            for (let r of subjects_) {
                subjects.push(
                    {
                        hash: r.hash,
                        name: r.name,
                        description: r.description
                    }
                );
            }
        });
    if (subjectHash) {
        await db.t_subjects.findAll({
            where: {
                hash: subjectHash
            },
            raw: true,
            include: [{
                model: db.t_problems,
                required: true
            }]
        }).then((r: any) => {
            for (let rr of r) {
                problems.push({
                    hash: rr["t_problems.hash"],
                    problem_body: rr["t_problems.problem_body"],
                    subject_id: rr["t_problems.subject_id"],
                    answer_type: rr["t_problems.answer_type"],
                    problem_type: rr["t_problems.problem_type"],
                    problem_image_url: rr["t_problems.problem_image_url"]
                });
            }
        });
    }
    return {
        props: {
            problems: problems,
            subjects: subjects,
            selectedSubject: subjectHash || ""
        }
    }
};

const problem = [
    {
        subject: "教科名",
        problem: "問題"
    },
    {
        subject: "教科名",
        problem: "問題"
    },
    {
        subject: "教科名",
        problem: "問題"
    },
];

const ProblemList = (props: {
    problems: ProblemForm[],
    subjects: SubjectForm[],
    selectedSubject: string
}) => {
    const [selectedSubject, setSelectedSubject] = useState(props.selectedSubject);
    return (
        <ReviewCommon appbar={{ title: "問題一覧" }} snackBar={{}}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "10px"
                }}>
                <FormControl variant="filled">
                    <InputLabel id="demo-simple-select-outlined-label">教科</InputLabel>
                    <Select
                        onChange={(event) => {
                            router.push(`${router.pathname}?subjectHash=${event.target.value}`)
                            setSelectedSubject(event.target.value as string);
                        }}
                        value={selectedSubject}
                    >
                        <MenuItem value="">
                            <em>未選択</em>
                        </MenuItem>
                        {props.subjects.map(sub => (<MenuItem value={sub.hash}>{sub.name}</MenuItem>))}
                    </Select>
                </FormControl>
                <List>
                    {
                        props.problems.map(e => <Problems problem={e} />)
                    }
                </List>
            </div>
        </ReviewCommon>
    );
};

const Problems = (props: { problem: ProblemForm }) => {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        dexieDb.MarkList.get(props.problem.hash)
            .then(e => setChecked(e != undefined));
    });
    return (
        <ListItem>
            <ListItemText primary={props.problem.problem_body} />
            <ListItemSecondaryAction>
                <Checkbox onChange={async (event) => {
                    setChecked(event.target.checked);
                    if (event.target.checked)
                        await dexieDb.MarkList.add(Object.assign({
                            isCollect: false,
                            id: -1,
                            choices: [],
                            subject_name: ""
                        }, props.problem));
                    else
                        await dexieDb.MarkList.delete(props.problem.hash);
                }} checked={checked} />
            </ListItemSecondaryAction>
        </ListItem>
    )
};

export default ProblemList;