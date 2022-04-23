import { Button, Typography } from "@material-ui/core";
import router from "next/router";
import React, { useEffect, useState } from "react";
import ReviewCommon from "../../components/ReviewCommon";
import ReviewResultList from "../../components/ReviewResultList";
import { dexieDb, IAnswerList } from "../../models/dexie";

const List = () => {
    const [subjectName, setSubjectName] = useState("");
    const [problemList,setProblemList] = 
        useState<{problemBody:string,isCollect:boolean,hash:string}[]>([]);
    const [statistics, setStatistics] = useState({
        number: 0,
        numOfCollect: 0,
        rate: 0
    });
    const endAnswer = () => {
        // problem_hash_orderとcurrentProblemとproblemを初期化する。
        dexieDb.problem_hash_order.clear();
        dexieDb.currentProblem.clear();
        dexieDb.problem.clear();
        dexieDb.checked.clear();
        dexieDb.answerList.clear();
        router.push("/Play/SubjectList");
    };
    useEffect(() => {
        dexieDb.problem.toArray()
        .then(e => setSubjectName(e[0].subject_name));

        dexieDb.answerList.toArray()
        .then(e => {
            setProblemList(
                e.reverse().map(ee => {
                    return {problemBody:ee.problemBody,isCollect:ee.isCollect,hash:ee.hash} 
                })
            );
            const sta = Object.assign({},statistics);
            sta.numOfCollect = e.filter(ee => ee.isCollect).length;
            sta.number = e.length;
            sta.rate = sta.numOfCollect / sta.number * 100;
            setStatistics(sta);
        });

    },[]);
    return (
        <>
            <ReviewCommon appbar={{ title: "結果" }} snackBar={{}}>
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
                        <Typography variant="h4" align="center">{subjectName}</Typography>
                        <Typography variant="subtitle1" align="center">
                            {`${statistics.number}問中${statistics.numOfCollect}問正解`}
                        </Typography>
                        <Typography variant="subtitle1" align="center">{`${statistics.rate}%正解`}</Typography>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "10px"
                        }}>
                        <ReviewResultList resultList={problemList} />
                        <Button variant="contained" color="primary" onClick={endAnswer}>回答を終了する</Button>
                    </div>
                </div>
            </ReviewCommon>
        </>
    )
};

export default List;