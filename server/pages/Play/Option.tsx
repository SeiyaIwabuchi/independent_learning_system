import { Button, ListItem, ListItemSecondaryAction, ListItemText, Switch } from "@material-ui/core";
import { List, Typography } from "@material-ui/core"
import Dexie from "dexie";
import { GetServerSideProps } from "next";
import router from "next/router";
import React from "react";
import { useEffect } from "react";
import OuterFrame from "../../components/OuterFrame";
import ReviewCommon from "../../components/ReviewCommon";
import { dexieDb } from "../../models/dexie";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const subjectHash = context.query.subjectHash as string;
    return {
        props: {
            subjectHash: subjectHash
        }
    }
};

const SubjectList = (props: { subjectHash: string }) => {
    const handle = async () => {
        await fetch(`/api/ProblemHashList?subjectHash=${props.subjectHash}`)
            .then(res => res.json())
            .then(async (res: string[]) => {
                let i = 0;
                await dexieDb.problem_hash_order.clear();
                await dexieDb.problem_hash_order.bulkAdd(
                    res.map(e => { return { id: i++, hash: e } })
                );
                let nextProblem = "";
                await dexieDb.problem_hash_order.get(0).then(e => nextProblem = e!.hash);
                // TODO ここで今解いている問題の番号をDBに格納する。
                router.push(`/Play/Review?problemHash=${nextProblem}`)
            });
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
                                <Switch />
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