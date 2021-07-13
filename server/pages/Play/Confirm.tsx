import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core"
import { GetServerSideProps } from "next";
import router from "next/router";
import React from "react";
import OuterFrame from "../../components/OuterFrame";
import ReviewCommon from "../../components/ReviewCommon";

export const getServerSideProps: GetServerSideProps = async (context) => {
    // TODO 答え合わせの実装
    // DBから回答した問題を取得する。
    // ユーザが選択した選択肢を取得する。←どうやって？
    // formで送信する？
    const problemHash = context.query.problemHash as string;
    return {
        props:{

        }
    }
}

const Review = (props: {}) => {
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
                        <Typography variant="body1">{"なぜ人間は生きているのか"}</Typography>
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