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
    const subjectHash: string = context.query.subjectHash as string;
    return {
        props: {
            sessionId: await SessionIdValidater(context),
            subjectHash: subjectHash
        }
    }
};

const ChoicesList = (props:{ choicesList:any[], setChoicesList:(a:any)=>any}) => {
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

interface IProps {
    sessionId: string,
    subjectHash: string;
}

const Edit = (props: IProps) => {
    const [choicesList, setChoicesList]
        = useState<{
            id: number;
            choice_text: string;
            collect_flag: boolean;
        }[]>([]);
    const [problemType, setProblemType]
        = useState(0);
    const [choiceType, setChoiceType]
        = useState(0);
    const [problemBody, setProblemBody]
        = useState("");

    return (
        <ManagementCommon
            pageTitle="問題作成"
            pageLayoutType={LAYOUT_TYPE.EDIT}
            sessionId={props.sessionId}
            onRightButtonClicked={() => { }}>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    await fetch("/api/Problem", {
                        method: "POST",
                        body: JSON.stringify({
                            subjectHash: props.subjectHash,
                            hash: null,
                            problem_type: problemType,
                            answer_type: choiceType,
                            problem_body: problemBody,
                            choices: choicesList
                        })
                    })
                    .then(res => {
                        if(res.status >= 400){
                            res.json().then(resJson => {
                                console.log(resJson);
                                alert(resJson);
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert(err);
                    });
                    router.push(`/Manage/Problem/List?subjectHash=${props.subjectHash}`);
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
                                <Button variant="contained" color="primary">画像追加</Button>
                                <div style={{ margin: "15px" }}></div>
                                <img src={"http://via.placeholder.com/500x300"}></img>
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
                                id: Math.max(...choicesList.map(e => e.id)) + 1,
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