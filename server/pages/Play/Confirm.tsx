import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core"
import React from "react";
import OuterFrame from "../../components/OuterFrame";


const Review = (props: {}) => {
    return (
        <OuterFrame appbar={{ title: "オプション" }} snackbar={{}}>
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
                width:"95%",
                border:"1px solid",
                borderRadius:"3px",
                padding:"3px",
                marginBottom:"20px"
            }}>
                <Typography variant="body1">{"なぜ人間は生きているのか"}</Typography>
            </div>
            <Typography variant="h5" align="center" color="secondary" style={{marginBottom:"10px"}}>不正解</Typography>
            <Typography variant="body1" align="center" style={{marginBottom:"5px"}}>答え</Typography>
            <Button variant="contained" color="primary" style={{marginBottom:"20px"}} disabled>{"{選択肢３}"}</Button>
            <Typography variant="body1" align="center" style={{marginBottom:"5px"}}>あなたの回答</Typography>
            <Button variant="contained" color="primary" style={{marginBottom:"50px"}} disabled>{"{選択肢２}"}</Button>
            <Button variant="contained" color="primary" style={{marginBottom:"20px"}}>{"次の問題"}</Button>
            </div>
        </OuterFrame>
    )
}

export default Review;