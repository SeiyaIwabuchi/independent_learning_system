import { Typography } from "@material-ui/core";
import React from "react";
import OuterFrame from "../../../components/OuterFrame";

const Delete = () => {
    // title: string; leftButton?: Element | undefined; rightButton?: Element | undefined;
    const appbar = {
        title : "教科削除"
    }
    const snackbar = {

    };
    return (
        <OuterFrame appbar={appbar} snackbar={snackbar}>
            <Typography variant="h2">教科削除ページ</Typography>
        </OuterFrame>
    )
};

export default Delete;