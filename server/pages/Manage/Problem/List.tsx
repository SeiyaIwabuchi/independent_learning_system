import { FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import router from "next/router";
import React, { useState } from "react";
import { ISessionId } from "../../../query_param_shemas/SessionId";
import SessionIdValidater from "../../../utils/SessionIdValidater";
import ManagementCommon, { LAYOUT_TYPE } from "../../../components/ManagementCommon";
import db from "../../../models";
import { ProblemForm } from "../../../form_schemas/ts/ProblemForm";
import ProblemMenuList from "../../../components/ProblemMenuList";
import { ListItemText } from "@material-ui/core";
import { Sequelize } from "sequelize";
import { SubjectForm } from "../../../form_schemas/ts/SubjectForm";

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
        }).then((r : any) => {
            for(let rr of r){
                problems.push({
                    hash : rr["t_problems.hash"],
                    problem_body : rr["t_problems.problem_body"],
                    subject_id : -1,
                    answer_type : -1,
                    problem_type: rr["t_problems.problem_type"],
                    problem_image_url: rr["t_problems.problem_image_url"],
                });
            }
        });
    }
    return {
        props: {
            sessionId: await SessionIdValidater(context),
            problems: problems,
            subjects: subjects,
            selectedSubject: subjectHash || ""
        }
    }
};

const List = (props: ISessionId & { problems: ProblemForm[], subjects: SubjectForm[],selectedSubject: string }) => {

    const deleteList = useState<string[]>([]);

    return (
        <>
            <ManagementCommon
                pageTitle="????????????"
                pageLayoutType={LAYOUT_TYPE.MENU}
                sessionId={props.sessionId}
                AddUrl={`/Manage/Problem/Add?subjectHash=${props.selectedSubject}`}
                MenuList={[
                    <MenuItem onClick={() => {
                        router.push(`/Manage/Problem/Delete?list=${JSON.stringify(deleteList[0])}&subjectHash=${props.selectedSubject}`);
                    }} key={"DeleteSelectedItem"}>
                        <ListItemText primary="??????????????????"></ListItemText>
                    </MenuItem>
                ]}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px",
                        height: "110px",
                        justifyContent: "space-around"
                    }}
                >
                    <Typography variant="h4" align="center">???????????????</Typography>
                    <Typography variant="subtitle1" align="center">???????????????????????????????????????????????????</Typography>
                    <Typography variant="subtitle1" align="center">?????????????????????????????????????????????????????????</Typography>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "10px"
                    }}>
                    <FormControl variant="filled">
                        <InputLabel id="demo-simple-select-outlined-label">??????</InputLabel>
                        <Select
                            onChange={(event) => {
                                router.push(`${router.pathname}?subjectHash=${event.target.value}`)
                            }}
                            value={props.selectedSubject}
                        >
                            <MenuItem value="">
                                <em>?????????</em>
                            </MenuItem>
                            {props.subjects.map(sub => (<MenuItem value={sub.hash}>{sub.name}</MenuItem>))}
                        </Select>
                    </FormControl>
                    <ProblemMenuList menuList={props.problems} deleteList={deleteList} subject={{hash:props.selectedSubject}}/>
                </div>
            </ManagementCommon>
        </>
    )
};

export default List;