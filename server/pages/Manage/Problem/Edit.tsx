import { GetServerSideProps } from "next";
import React from "react";
import ManagementCommon, { LAYOUT_TYPE } from "../../../components/ManagementCommon";
import SessionIdValidater from "../../../utils/SessionIdValidater";
import { Button, IconButton, List, ListItem, MenuItem } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Field, Form } from "react-final-form";
import { Checkboxes, Select, TextField } from "mui-rff";
import { useState } from "react";
import { ProblemForm } from "../../../form_schemas/ts/ProblemForm";
import db, { t_problems } from "../../../models";


export const getServerSideProps: GetServerSideProps = async (context) => {
    const problemHash: string = context.query.problemHash as string;
    let problem: any;
    let choices: { id: number }[] = [];
    await db.t_problems.findOne({
        where: {
            hash: problemHash
        },
        raw: true,
    }).then(e => problem = JSON.parse(JSON.stringify(e)));
    await db.t_choices.findAll({
        where: {
            problem_id: problem.id
        },
    }).then(e => {
        choices = []
        let choicesObj:{[key:number]:any} = {};
        for(let a of e){
            choicesObj[a.id] = a;
        }
        let choices_a:number[] = [];
        for(let n of e) choices_a.push(n.id);
        choices_a.sort((a, b) => a > b ? 1 : -1);
        choices = [];
        for(let t of choices_a) choices.push(choicesObj[t]);
        choices = JSON.parse(JSON.stringify(choices))
    });
    return {
        props: {
            sessionId: await SessionIdValidater(context),
            problem: problem,
            choices: choices
        }
    }
};

interface IProps {
    sessionId: string,
    problem: {
        id: number,
        hash: string,
        problem_type: number,
        answer_type: number,
        problem_body: string
    },
    choices: {
        id: number,
        choice_text: string,
        collect_flag: boolean
    }[]
}

const ChoicesList = (
    props: {
        choices: [{
            id: number,
            choice_text: string,
            collect_flag: boolean
        }[],
            React.Dispatch<React.SetStateAction<{
                id: number,
                choice_text: string,
                collect_flag: boolean
            }[]>>
        ]
    }) => {
    return (
        <>
            {
                props.choices[0].map((e) => (
                    <div style={{ display: "flex" }}>
                        <Checkboxes name={`isCollect_${e.id}`} style={{ flexGrow: 15 }} data={{ label: "", value: e.collect_flag }} />
                        <TextField name={`choicesText_${e.id}`} style={{ flexGrow: 84, marginBottom: "15px" }} label={`選択肢${e.id}`} variant="outlined" />
                        <IconButton style={{ flexGrow: 1, marginBottom: "15px" }} onClick={
                            () => {
                                props.choices[1](
                                    props.choices[0].filter(ee => e.id != ee.id)
                                );
                            }
                        }>
                            <DeleteForeverIcon />
                        </IconButton>
                    </div>
                ))
            }
        </>
    )
}

const Edit = (props: IProps) => {
    /*
    {
        choicesText_1 : 
    }
    */
    const choicesObj_:any = {};
    for(let i=0;i<props.choices.length;i++){
        choicesObj_[`isCollect_${props.choices[i].id}`] = props.choices[i].collect_flag;
        choicesObj_[`choicesText_${props.choices[i].id}`] = props.choices[i].choice_text;
    }
    const choicesList = useState(props.choices);
    return (
        <ManagementCommon
            pageTitle="教科編集"
            pageLayoutType={LAYOUT_TYPE.EDIT}
            sessionId={props.sessionId}
            onRightButtonClicked={() => { }}>
            <Form
                onSubmit={async (values, form, callback) => {
                    await fetch("/api/Problem", {
                        method: "PUT",
                        body: JSON.stringify(values)
                    }).catch(err => {
                        console.log(err);
                        alert(err);
                    });
                }}
                initialValues={{
                    problem_hash: props.problem.hash,
                    problemType: props.problem.problem_type,
                    choiceType: props.problem.answer_type,
                    problemBody: props.problem.problem_body,
                    ...choicesObj_
                }}
                render={({ handleSubmit, values }) => (
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "10px",
                        }}>
                            <Field name="problem_hash" component="input" type="hidden"/>
                        <Typography variant="body1">問題にはテキストか画像を使用できます。</Typography>
                        <div style={{ margin: "15px" }}></div>
                        <Select name="problemType" formControlProps={{ variant: "outlined" }}>
                            <MenuItem value="0" selected>テキスト</MenuItem>
                            <MenuItem value="1">画像</MenuItem>
                        </Select>
                        <div style={{ margin: "15px" }}></div>
                        {
                            values.problemType == "0" ?
                                (<TextField name="problemBody" variant="outlined" label="問題文" multiline />) :
                                (
                                    <>
                                        <Button variant="contained" color="primary">画像追加</Button>
                                        <div style={{ margin: "15px" }}></div>
                                        <img src={"http://via.placeholder.com/500x300"}></img>
                                    </>
                                )
                        }
                        <div style={{ margin: "15px" }}></div>
                        <Typography variant="body1">回答方法には選択式とテキスト入力が使えます。</Typography>
                        <div style={{ margin: "15px" }}></div>
                        <Select name="choiceType" formControlProps={{ variant: "outlined" }} >
                            <MenuItem value="">
                                <em>未選択</em>
                            </MenuItem>
                            <MenuItem value="0">選択式</MenuItem>
                            <MenuItem value="1">テキスト</MenuItem>
                        </Select>
                        <div style={{ margin: "15px" }}></div>
                        {values.choiceType == "0" ? (
                            <>
                                <Typography variant="body1">回答用の選択肢</Typography>
                                <div style={{ margin: "15px" }}></div>
                                <div style={{ display: "flex" }}>
                                    <Typography variant="body1" style={{ flexGrow: 1, textAlign: "center" }}>答え</Typography>
                                    <Typography variant="body1" style={{ flexGrow: 16, textAlign: "center" }}>選択肢</Typography>
                                    <Typography variant="body1" style={{ flexGrow: 1, textAlign: "center" }}>削除</Typography>
                                </div>
                                <List>
                                    <ChoicesList choices={choicesList} />
                                </List>
                                <Button variant="contained" color="primary" onClick={() => {
                                    const tlist = choicesList[0].slice();
                                    tlist.push({
                                        id: Math.max(...choicesList[0].map(e => e.id)) + 1,
                                        collect_flag: false,
                                        choice_text: ""
                                    });
                                    choicesList[1](tlist);
                                }
                                }>選択肢追加</Button>
                            </>
                        ) : (
                            <TextField name="collectText" variant="outlined" label="正解のテキスト"></TextField>
                        )}
                        <div style={{ margin: "15px" }}></div>
                        <Button variant="contained" color="secondary" type="submit">問題追加</Button>
                    </form>
                )}
            />
        </ManagementCommon>
    )
};

export default Edit;