import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@material-ui/core";
import { Typography } from "@material-ui/core"
import { GetServerSideProps } from "next";
import router from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import OuterFrame from "../../components/OuterFrame";
import ReviewCommon from "../../components/ReviewCommon";
import { dexieDb, IChoices, IProblem_hash_order } from "../../models/dexie";

const Review = () => {
    const [problemBody, setProblemBody] = useState("");
    const [collectChoice, setCollectChoice] = useState<IChoices[]>([]);
    const [choiced, setChoiced] = useState<IChoices[]>([]);
    const [isMatch, setIsMatch] = useState<boolean>(false);
    const [subjectName, setSubjectName] = useState("");
    const handleClick = async () => {
        let problemHashList:string[] = [];
        let currentProblemId = -1;
        await dexieDb.problem_hash_order.toArray()
        .then(array => {
            problemHashList = array.map(e => e.hash);
        });
        await dexieDb.currentProblem.toArray()
        .then(e => currentProblemId = e[0].id);
        if(problemHashList.length - 1 > currentProblemId){
            await dexieDb.currentProblem.clear();
            await dexieDb.currentProblem.add({id:++currentProblemId});
            const nextProblemHash = problemHashList[currentProblemId];
            router.push(`/Play/Review?problemHash=${nextProblemHash}`);
        }else{
            router.push(`/Play/Result`);
        }
    };
    // useEffectの第２引数には変数（ステートフック）を記述する。変数が更新されるとuseEffectに設定した関数が呼び出される。
    useEffect(() => {
        dexieDb.problem.toArray()
        .then(array => {
            setProblemBody(array[0].problem_body);
            setSubjectName(array[0].subject_name)
            setCollectChoice(
                array[0].choices.
                filter(e => e.collect_flag)
            );
            dexieDb.checked.toArray()
            .then(arrayChecked => {
                setChoiced(array[0].choices.filter(e => arrayChecked[0].checked[e.id]));
                const collect:{[key:number]:boolean} = {};
                array[0].choices.forEach(
                    e => collect[parseInt(e.id)] = e.collect_flag
                );
                let isCollectResult = true;
                Object.keys(collect).map(
                    e => 
                        collect[parseInt(e)] == (arrayChecked[0].checked[e] == undefined ? false : arrayChecked[0].checked[e])
                )
                .forEach(e => {
                    console.log(e);
                    isCollectResult = isCollectResult && e;
                });
                dexieDb.answerList.add({
                    hash: array[0].hash,
                    problemBody: array[0].problem_body,
                    isCollect: isCollectResult,
                });
                setIsMatch(isCollectResult);
            });
        });
    }, []);
    return (
        <ReviewCommon appbar={{ title: "答え合わせ" }} snackBar={{}}>
            <div>
                <Typography variant="body2">{subjectName}</Typography>
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
                            marginBottom: "20px"
                        }}>
                        <Typography variant="body1">{problemBody}</Typography>
                    </div>
                    <Typography variant="h5" align="center" color="secondary" style={{ marginBottom: "10px" }}>
                        {
                            isMatch?"正解":"不正解"
                        }
                    </Typography>
                    <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
                            <FormLabel component="legend">答え</FormLabel>
                            <FormGroup>
                                {
                                    collectChoice.map(c => (
                                        <FormControlLabel
                                            control={<Checkbox checked={true} disabled />}
                                            label={c.choice_text}
                                        />
                                    ))
                                }
                            </FormGroup>
                        </FormControl>
                    <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
                            <FormLabel component="legend">あなたの解答</FormLabel>
                            <FormGroup>
                                {
                                    choiced.map(c => (
                                        <FormControlLabel
                                            control={<Checkbox checked={true} disabled />}
                                            label={c.choice_text}
                                        />
                                    ))
                                }
                            </FormGroup>
                        </FormControl>
                    <Button variant="contained" color="primary" style={{ marginBottom: "20px" }} onClick={handleClick}>{"次の問題"}</Button>
                </div>
            </div>
        </ReviewCommon>
    )
}

export default Review;