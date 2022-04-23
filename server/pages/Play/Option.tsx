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
    console.log(context.query);
    const subjectHash = context.query.subjectHash;
    console.log(subjectHash);
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
    return {
        props: {
            problemHashList: problemHashList
        }
    }
};

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const SubjectList = (props: { problemHashList: string[] }) => {
    const [isShuffle, setIsShuffle] = useState(false);
    const handle = async () => {
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
        let nextProblem = "";
        await dexieDb.problem_hash_order.get(0).then(e => nextProblem = e!.hash);
        await dexieDb.currentProblem.clear();
        await dexieDb.currentProblem.add({ id: 0 });
        await dexieDb.answerList.clear();
        router.push(`/Play/Review?problemHash=${nextProblem}`)
    };
    return (
        <ReviewCommon appbar={{ title: "オプション" }} snackBar={{}}>
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
                                <Switch value={isShuffle} onChange={e => setIsShuffle(e.target.checked)} />
                            </ListItemSecondaryAction>
                        </ListItem>
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