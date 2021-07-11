import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core"
import { GetServerSideProps } from "next";
import router from "next/router";
import React from "react";
import OuterFrame from "../../components/OuterFrame";
import ReviewCommon from "../../components/ReviewCommon";
import db from "../../models";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const problemHash = context.query.problemHash as string;
    let props: { subject: any, problem: any, choices: any[] }
        = { subject: {}, problem: {}, choices: [] };
    await db.t_problems.findOne({
        where: {
            hash: problemHash
        }
    })
        .then(r =>
            props.problem = {
                id: r!.id,
                hash: r!.hash,
                subject_id: r!.subject_id,
                problem_type: r!.problem_type,
                answer_type: r!.answer_type,
                problem_body: r!.problem_body,
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

const Review = (props: {
    subject: {
        id: number,
        hash: string,
        name: string,
        description: string
    },
    problem: {
        id: number,
        hash: string,
        subject_id: number,
        problem_type: number,
        answer_type: number,
        problem_body: string,
    },
    choices: {
        id: string,
        problem_id: number,
        choice_text: string,
        collect_flag: boolean,
        image_id: number
    }[]
}) => {
    console.log(props);
    return (
        <ReviewCommon appbar={{ title: "復習" }} snackBar={{}}>
            <div>
                <Typography variant="body2">{props.subject.name}</Typography>
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
                        <Typography variant="body1">{props.problem.problem_body}</Typography>
                    </div>
                    {(() =>
                        props.choices.map(c => (
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginBottom: "20px" }}
                                onClick={() => {
                                    router.push("/Play/Confirm");
                                }}
                            >{c.choice_text}</Button>
                        ))
                    )()}
                </div>
            </div>
        </ReviewCommon>
    )
}

export default Review;