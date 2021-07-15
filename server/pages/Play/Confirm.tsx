import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core"
import { GetServerSideProps } from "next";
import router from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import OuterFrame from "../../components/OuterFrame";
import ReviewCommon from "../../components/ReviewCommon";
import { dexieDb } from "../../models/dexie";

const Review = () => {
    const [problem, setProblem] = useState("");
    // useEffectの第２引数には変数（ステートフック）を記述する。変数が更新されるとuseEffectに設定した関数が呼び出される。
    useEffect(() => {
        dexieDb.problem.toArray()
        .then(array => {
            setProblem(array[0].problem_body);
        })
    }, []);
    return (
        <ReviewCommon appbar={{ title: "答え合わせ" }} snackBar={{}}>
            <div>
                <Typography variant="body2">{"{教科名}"}</Typography>
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
                        <Typography variant="body1">{problem}</Typography>
                    </div>
                    <Typography variant="h5" align="center" color="secondary" style={{ marginBottom: "10px" }}>不正解</Typography>
                    <Typography variant="body1" align="center" style={{ marginBottom: "5px" }}>答え</Typography>
                    <Button variant="contained" color="primary" style={{ marginBottom: "20px" }} disabled>{"{選択肢３}"}</Button>
                    <Typography variant="body1" align="center" style={{ marginBottom: "5px" }}>あなたの回答</Typography>
                    <Button variant="contained" color="primary" style={{ marginBottom: "50px" }} disabled>{"{選択肢２}"}</Button>
                    <Button variant="contained" color="primary" style={{ marginBottom: "20px" }} onClick={() => router.push("/Play/Result")}>{"次の問題"}</Button>
                </div>
            </div>
        </ReviewCommon>
    )
}

export default Review;