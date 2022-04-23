import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@material-ui/core";
import { Typography } from "@material-ui/core"
import { GetServerSideProps } from "next";
import router from "next/router";
import React, { useEffect, useState } from "react";
import OuterFrame from "../../components/OuterFrame";
import ReviewCommon from "../../components/ReviewCommon";
import db from "../../models";
import { dexieDb } from "../../models/dexie";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const problemHash = context.query.problemHash as string;
    let props: { subject: any, problem: any, choices: any[] }
        = { subject: {}, problem: {}, choices: [] };
    await db.t_problems.findOne({
        where: {
            hash: problemHash
        },
        include: [{
            model: db.t_subjects,
            required: true
        }],
        raw: true
    })
        .then((r: db.t_problems & { [key: string]: any } | null) =>
            props.problem = {
                id: r!.id,
                hash: r!.hash,
                subject_id: r!.subject_id,
                problem_type: r!.problem_type,
                answer_type: r!.answer_type,
                problem_body: r!.problem_body,
                subject_name: r!["t_subject.name"]
            }
        );
    await db.t_choices.findAll({
        where: {
            problem_id: props.problem.id
        }
    })
        .then(r => {
            for (let re of r) {
                props.choices.push({
                    id: re.id,
                    problem_id: re.problem_id,
                    choice_text: re.choice_text,
                    collect_flag: re.collect_flag,
                    image_id: re.image_id,
                })
            }
        }
        )
    return {
        props: props
    }
};

function Space() {
    return <>&nbsp;</>;
}
function Rlw(props: { str: string }) {
    // Replace leading whitespace
    return (
        <>
            {(props.str.match(/^\s+/) || [""])[0].split("").map((v, i) => (
                <Space key={i}/>
            ))}
            <>{props.str}</>
        </>
    );
}

const Review = (props: {
    problem: {
        id: number,
        hash: string,
        subject_id: number,
        problem_type: number,
        answer_type: number,
        problem_body: string,
        subject_name: string
    },
    choices: {
        id: string,
        problem_id: number,
        choice_text: string,
        collect_flag: boolean,
        image_id: number
    }[]
}) => {
    const [checked, setChecked] = useState<{ [key: string]: boolean }>({});
    const [problem_body, SetProblem_body] = useState([<></>]);
    const getChecked = (key: string) => {
        return checked[key] == true
    };
    const handleSend = async () => {
        await dexieDb.checked.clear();
        await dexieDb.checked.add({ id: 0, checked: checked });
        router.push("/Play/Confirm");
    };
    const handleChenged = (c: any, event: any) => {
        setChecked(
            Object.assign(
                checked,
                { [c.id]: event.target.checked }
            )
        )
    };
    useEffect(() => {
        const storeProblem = Object.assign({ choices: props.choices }, props.problem);
        dexieDb.problem.clear()
            .then(() => {
                dexieDb.problem.add(storeProblem, storeProblem.id);
            });
        SetProblem_body(props.problem.problem_body.split("\n")
            .map((v, i, a) => (
                <>
                    <Rlw str={v} />
                    <br />
                </>
            )));
    }, []);
    return (
        <ReviewCommon appbar={{ title: "復習" }} snackBar={{}}>
            <div>
                <Typography variant="body2">{props.problem.subject_name}</Typography>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "10px"
                    }}>
                    <div
                        style={{
                            width: "95%",
                            border: "1px solid",
                            borderRadius: "3px",
                            padding: "3px",
                            marginBottom: "50px"
                        }}>
                        <Typography variant="body1">{problem_body}</Typography>
                    </div>
                    <form style={{ marginBottom: "20px" }}>
                        <FormControl component="fieldset" >
                            <FormLabel component="legend">選択肢</FormLabel>
                            <FormGroup>
                                {
                                    props.choices.map(c => (
                                        <FormControlLabel
                                            control={<Checkbox value={getChecked(c.id)} onChange={(event) => handleChenged(c, event)} />}
                                            label={c.choice_text}
                                        />
                                    ))
                                }
                            </FormGroup>
                        </FormControl>
                    </form>
                    <Button type="submit" variant="contained" color="primary" onClick={handleSend}>送信</Button>
                </div>
            </div>
        </ReviewCommon>
    )
}

export default Review;