import { Button, ListItem, ListItemSecondaryAction, ListItemText, Switch } from "@material-ui/core";
import { List, Typography } from "@material-ui/core"
import { GetServerSideProps } from "next";
import router from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReviewCommon from "../../components/ReviewCommon";
import { dexieDb } from "../../models/dexie";
import db, { t_subjects } from "../../models";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const subjectHash = context.query.subjectHash;
    const problemHashList = (await db.t_problems.findAll({
        attributes: ["hash"],
        where: {
            "$t_subject.hash$": subjectHash
        },
        include: [{
            model: t_subjects,
        }],
        order: ["id"]
    })).map(ee => ee.hash);
    const subjectId = (await db.t_subjects.findOne({
        attributes:["id"],
        where:{
            hash:subjectHash
        }
    }))!.id;
    return {
        props: {
            problemHashList: problemHashList,
            subjectId:subjectId
        }
    }
};

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const SubjectList = (props: { problemHashList: string[], subjectId:number }) => {
    const [isShuffle, setIsShuffle] = useState(false);
    const [isCanBeContinued, setIsCanBeContinued] = useState(false);
    const [isContinue, setIsContinue] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handle = async () => {
        let nextProblemNumber = 0;
        if (!isContinue) {
            let i = 0;
            await dexieDb.problem_hash_order.clear();
            const problemHashList = props.problemHashList.slice();
            if (isShuffle) {
                for (let i = problemHashList.length; i > 1; i--) {
                    let a = i - 1;
                    let b = getRandomInt(0, 0x7fffffff) % i;
                    let t = problemHashList[a];
                    problemHashList[a] = problemHashList[b];
                    problemHashList[b] = t;
                }
            }
            await dexieDb.problem_hash_order.bulkAdd(
                problemHashList.map(e => { return { id: i++, hash: e } })
            );
            await dexieDb.currentProblem.clear();
            await dexieDb.currentProblem.add({ id: 0 });
            await dexieDb.answerList.clear();
        }else{
            nextProblemNumber = (await dexieDb.currentProblem.toArray())[0]!.id;
        }
        let nextProblemHash = "";
        nextProblemHash = (await dexieDb.problem_hash_order.get(nextProblemNumber))!.hash;
        router.push(`/Play/Review?problemHash=${nextProblemHash}`)
    };
    useEffect(() => {
        const interval = setInterval(()=>setIsLoading(true),500);
        // problem_hash_orderとcurrentProblemとproblemがdexieDBにあるときかつ
        // 教科がsubject_idが一致するときは
        // 前回から継続できると判断する。
        (async () => {
            const count = (await dexieDb.problem_hash_order.count()) + (await dexieDb.currentProblem.count()) + (await dexieDb.problem.count());
            const remain = ((await dexieDb.problem.toArray())[0] || {subject_id:-1}).subject_id;
            setIsCanBeContinued(count > 0 && props.subjectId == remain);
            clearInterval(interval);
            setIsLoading(false);
        })();
    },[]);
    return (
        <ReviewCommon appbar={{ title: "オプション" }} snackBar={{}} loading_circle={{state:isLoading}}>
            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px",
                        height: "110px",
                        justifyContent: "space-around"
                    }}
                >
                    <Typography variant="h4" align="center">オプション設定</Typography>
                    <Typography variant="subtitle1" align="center"></Typography>
                    <Typography variant="subtitle1" align="center"></Typography>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "10px"
                    }}>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={"問題の出題順をランダムにする。"}
                            />
                            <ListItemSecondaryAction>
                                <Switch checked={isShuffle} onChange={e => { setIsShuffle(e.target.checked); setIsContinue(!e.target.checked && isContinue) }} />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <div style={{ display: isCanBeContinued ? "block " : "none" }}>
                            <ListItem>
                                <ListItemText
                                    primary={"前回の続きから始める。"}
                                />
                                <ListItemSecondaryAction>
                                    <Switch checked={isContinue} onChange={e => { setIsContinue(e.target.checked); setIsShuffle(!e.target.checked && isShuffle); }} />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </div>
                    </List>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handle}>開始</Button>
                </div>
            </div>
        </ReviewCommon>
    )
}

export default SubjectList;