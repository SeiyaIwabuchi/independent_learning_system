import { GetServerSideProps } from "next";
import React from "react";
import ManagementCommon, { LAYOUT_TYPE } from "../../../components/ManagementCommon";
import SessionIdValidater from "../../../utils/SessionIdValidater";
import { Button, Checkbox, IconButton, List, ListItem, MenuItem, Select, TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useState } from "react";
import { ProblemForm } from "../../../form_schemas/ts/ProblemForm";
import db, { t_problems } from "../../../models";
import { FormControl } from "@material-ui/core";
import router from "next/router";


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
    console.log(problem);
    
    await db.t_choices.findAll({
        where: {
            problem_id: problem.id
        },
    }).then(e => {
        console.log(e);
        
        choices = []
        let choicesObj: { [key: number]: any } = {};
        for (let a of e) {
            choicesObj[a.id] = a;
        }
        let choices_a: number[] = [];
        for (let n of e) choices_a.push(n.id);
        choices_a.sort((a, b) => a > b ? 1 : -1);
        choices = [];
        for (let t of choices_a) choices.push(choicesObj[t]);
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
        problem_body: string,
        problem_image_url: string
    },
    choices: {
        id: number | null,
        choice_text: string,
        collect_flag: boolean
    }[]
}

const ChoicesList = (props: { choicesList: any[], setChoicesList: (a: any) => any }) => {
    const choicesList = props.choicesList;
    const setChoicesList = props.setChoicesList;
    const list: JSX.Element[] = [];
    for (let i = 0; i < choicesList.length; i++) {
        list.push(
            <div style={{ display: "flex" }}>
                <Checkbox style={{ flexGrow: 15 }} checked={choicesList[i].collect_flag}
                    onChange={(event) => {
                        const t = choicesList.slice();
                        t[i].collect_flag = event.target.checked;
                        setChoicesList(t);
                    }} />
                <TextField name={`choicesText_${i}`} style={{ flexGrow: 84, marginBottom: "15px" }} label={`選択肢${i + 1}`}
                    variant="outlined" value={choicesList[i].choice_text} onChange={
                        (event) => {
                            const t = choicesList.slice();
                            t[i].choice_text = event.target.value;
                            setChoicesList(t);
                        }} />
                <IconButton style={{ flexGrow: 1, marginBottom: "15px" }} onClick={
                    () => {
                        let tlist = choicesList.slice();
                        tlist.splice(i, 1);
                        setChoicesList(tlist);
                    }
                }>
                    <DeleteForeverIcon />
                </IconButton>
            </div>
        );
    }
    return (<>{list}</>);
}


const Edit = (props: IProps) => {
    const [choicesList, setChoicesList]
        = useState(props.choices);
    const [problemType, setProblemType]
        = useState(props.problem.problem_type);
    const [choiceType, setChoiceType]
        = useState(props.problem.answer_type);
    const [problemBody, setProblemBody]
        = useState(props.problem.problem_body);
    const [localFile, setLocalFile] = useState<File>();
    const [snackBarState, setSnackBarState] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState("");
    // console.log(props.problem.problemImageURL);
    
    return (
        <ManagementCommon
            pageTitle="問題編集"
            pageLayoutType={LAYOUT_TYPE.EDIT}
            sessionId={props.sessionId}
            onRightButtonClicked={() => { }}
            snackBar={{
                setState: setSnackBarState,
                state: snackBarState,
                msg: snackBarMsg,
            }}>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    let problemImageURL = "";
                    let nextcloudHost = `http://${process.env.IMAGE_SERVER}/image`;

                    if (problemType == 1) { //画像を問題として使用するときは一度画像単体で送信する
                        if (localFile != undefined) {
                            const formData = new FormData();
                            formData.append("file", localFile);
                            await fetch(nextcloudHost, {
                                method: "POST",
                                body: formData,
                                mode: "cors",
                                headers: {
                                    authorization: process.env.IMAGE_SERVER_AUTH || "auth",
                                    'Access-Control-Request-Method': 'POST'
                                },
                            })
                                .then(async res => {
                                    if (!res.ok) {
                                        console.log(`status code: ${res.status}`);
                                        alert(`status code: ${res.status}`);
                                        res.text().then(resJson => {
                                            console.log(resJson);
                                            alert(resJson);
                                        })
                                    } else {
                                        problemImageURL = (await res.json()).url!;
                                        console.log(problemImageURL);

                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                    alert(err);
                                });
                        }
                    }
                    console.log(choicesList);
                    
                    await fetch("/api/Problem", {
                        method: "PUT",
                        body: JSON.stringify({
                            hash: props.problem.hash,
                            problem_type: problemType,
                            answer_type: choiceType,
                            problem_body: problemBody,
                            choices: choicesList,
                            problemImageURL: problemImageURL
                        })
                    }) .then(async res => {
                        if (!res.ok) {
                            console.log(`status code: ${res.status}`);
                            alert(`status code: ${res.status}`);
                            res.text().then(resJson => {
                                console.log(resJson);
                                alert(resJson);
                            })
                        } else {
                            problemImageURL = (await res.json()).url!;
                            console.log(problemImageURL);

                        }
                    }).catch(err => {
                        console.log(err);
                        alert(err);
                    });
                    router.push(`/Manage/Problem/List?subjectHash=${router.query.subjectHash}`);
                }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "10px",
                }}>
                <Typography variant="body1">問題にはテキストか画像を使用できます。</Typography>
                <div style={{ margin: "15px" }}></div>
                <FormControl>
                    <Select name="problemType" variant="outlined" value={problemType}
                        onChange={event => setProblemType(event.target.value as number)}>
                        <MenuItem value={0} selected>テキスト</MenuItem>
                        <MenuItem value={1} >画像</MenuItem>
                    </Select>
                </FormControl>
                <div style={{ margin: "15px" }}></div>
                {
                    problemType == 0 ?
                        (<TextField name="problemBody" variant="outlined" label="問題文"
                            value={problemBody} multiline onChange={(event) => setProblemBody(event.target.value)} />) :
                        (
                            <>
                                <label htmlFor="upload_image">
                                    <input
                                        accept="image/*"
                                        id="upload_image"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={(event) => {
                                            if (event.target.files == null || !event.target.files[0]) return;
                                            setLocalFile(event.target.files[0]);
                                        }}
                                    />
                                    <Button variant="contained" color="primary" component="span" style={{ width: "100%" }}>画像追加</Button>
                                </label>
                                <div style={{ margin: "15px" }}></div>
                                <img src={localFile ? URL.createObjectURL(localFile) : props.problem.problem_image_url || "http://via.placeholder.com/500x300"}></img>
                            </>
                        )
                }
                <div style={{ margin: "15px" }}></div>
                <Typography variant="body1">回答方法には選択式とテキスト入力が使えます。</Typography>
                <div style={{ margin: "15px" }}></div>
                <FormControl variant="outlined">
                    <Select name="choiceType" value={choiceType}
                        onChange={event => setChoiceType(event.target.value as number)}>
                        <MenuItem value={0}>選択式</MenuItem>
                        <MenuItem value={1}>テキスト</MenuItem>
                    </Select>
                </FormControl>
                <div style={{ margin: "15px" }}></div>
                {choiceType == 0 ? (
                    <>
                        <Button variant="contained" color="primary" onClick={() => {
                            const tlist = choicesList.slice();
                            tlist.push({
                                // id: Math.max(...choicesList.map(e => e.id)) + 1,
                                id: null,
                                collect_flag: false,
                                choice_text: ""
                            });
                            setChoicesList(tlist);
                        }
                        }>選択肢追加</Button>
                        <Typography variant="body1">回答用の選択肢</Typography>
                        <div style={{ margin: "15px" }}></div>
                        <div style={{ display: "flex" }}>
                            <Typography variant="body1" style={{ flexGrow: 1, textAlign: "center" }}>答え</Typography>
                            <Typography variant="body1" style={{ flexGrow: 16, textAlign: "center" }}>選択肢</Typography>
                            <Typography variant="body1" style={{ flexGrow: 1, textAlign: "center" }}>削除</Typography>
                        </div>
                        <List>
                            <ChoicesList choicesList={choicesList} setChoicesList={setChoicesList} />
                        </List>
                        <Button variant="contained" color="primary" onClick={() => {
                            const tlist = choicesList.slice();
                            tlist.push({
                                // id: Math.max(...choicesList.map(e => e.id)) + 1,
                                id: null,
                                collect_flag: false,
                                choice_text: ""
                            });
                            setChoicesList(tlist);
                        }
                        }>選択肢追加</Button>
                    </>
                ) : (
                    <TextField name="collectText" variant="outlined" label="正解のテキスト"></TextField>
                )}
                <div style={{ margin: "15px" }}></div>
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                >完了</Button>
            </form>
        </ManagementCommon>
    )
};

export default Edit;