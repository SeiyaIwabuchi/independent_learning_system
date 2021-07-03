import { Typography } from "@material-ui/core"
import React from "react";
import OuterFrame from "../../components/OuterFrame";

const SubjectList = (props: {}) => {
    return (
        <OuterFrame appbar={{
            title: "オプション選択",
        }} snackbar={{}}>
            <div>
                <Typography variant="h3">
                    復習オプション選択画面
                </Typography>
                <Typography variant="body1">
                    現段階ではランダムオプションを付ける予定
                </Typography>
            </div>
        </OuterFrame>
    );
}

export default SubjectList;