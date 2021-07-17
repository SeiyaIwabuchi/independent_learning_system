import { Button, Typography } from "@material-ui/core";
import router from "next/router";
import React, { useEffect, useState } from "react";
import ReviewCommon from "../../components/ReviewCommon";
import ReviewResultList from "../../components/ReviewResultList";
import { dexieDb, IAnswerList } from "../../models/dexie";

const DummyResultList = [
    {
        problem: "問題１",
        isCollect: true
    },
    {
        problem: "問題２",
        isCollect: false
    },
    {
        problem: "問題３",
        isCollect: true
    },
    {
        problem: "問題４",
        isCollect: false
    },
];

const List = () => {
    const [subjectName, setSubjectName] = useState("");
    const [problemList,setProblemList] = 
        useState<{problem:string,isCollect:boolean}[]>([]);
    const [statistics, setStatistics] = useState({
        number: 0,
        numOfCollect: 0,
        rate: 0
    });
    useEffect(() => {
        dexieDb.problem.toArray()
        .then(e => setSubjectName(e[0].subject_name));

        dexieDb.answerList.toArray()
        .then(e => {
            setProblemList(
                e.reverse().map(ee => {
                    return {problem:ee.problemBody,isCollect:ee.isCollect} 
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
                        <Button variant="contained" color="primary" onClick={() => router.push("/Play/SubjectList") }>教科一覧</Button>
                    </div>
                </div>
            </ReviewCommon>
        </>
    )
};

export default List;