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
                marginBottom:"50px"
            }}>
                <Typography variant="body1">{"なぜ人間は生きているのか"}</Typography>
            </div>
            <Button variant="contained" color="primary" style={{marginBottom:"20px"}}>{"{選択肢１}"}</Button>
            <Button variant="contained" color="primary" style={{marginBottom:"20px"}}>{"{選択肢２}"}</Button>
            <Button variant="contained" color="primary" style={{marginBottom:"20px"}}>{"{選択肢３}"}</Button>
            <Button variant="contained" color="primary" style={{marginBottom:"20px"}}>{"{選択肢N}"}</Button>
            </div>
        </OuterFrame>
    )
}

export default Review;