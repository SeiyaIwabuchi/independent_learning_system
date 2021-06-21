import { Typography } from "@material-ui/core";
import React from "react";
import OuterFrame from "../../../components/OuterFrame";

const Change = () => {
    // title: string; leftButton?: Element | undefined; rightButton?: Element | undefined;
    const appbar = {
        title : "教科変更"
    }
    const snackbar = {

    };
    return (
        <OuterFrame appbar={appbar} snackbar={snackbar}>
            <Typography variant="h2">教科変更ページ</Typography>
        </OuterFrame>
    )
};

export default Change;