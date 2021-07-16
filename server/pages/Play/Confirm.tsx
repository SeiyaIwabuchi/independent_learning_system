import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@material-ui/core";
import { Typography } from "@material-ui/core"
import { GetServerSideProps } from "next";
import router from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import OuterFrame from "../../components/OuterFrame";
import ReviewCommon from "../../components/ReviewCommon";
import { dexieDb, IChoices } from "../../models/dexie";

const Review = () => {
    const [problemBody, setProblemBody] = useState("");
    const [collectChoice, setCollectChoice] = useState<IChoices[]>([]);
    const [choiced, setChoiced] = useState<IChoices[]>([]);
    const [isMatch, setIsMatch] = useState<boolean>(false);
    const [subjectName, setSubjectName] = useState("");
    // useEffectの第２引数には変数（ステートフック）を記述する。変数が更新されるとuseEffectに設定した関数が呼び出される。
    useEffect(() => {
        // TODO DONE クライアントDBに格納されている問題とユーザの回答を比較する。
        // TODO DONE 一致するか否かで表示を変更する。
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
                    <Button variant="contained" color="primary" style={{ marginBottom: "20px" }} onClick={() => router.push("/Play/Result")}>{"次の問題"}</Button>
                </div>
            </div>
        </ReviewCommon>
    )
}

export default Review;