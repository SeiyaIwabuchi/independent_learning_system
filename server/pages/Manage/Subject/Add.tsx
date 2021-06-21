import { Typography } from "@material-ui/core";
import React from "react";
import OuterFrame from "../../../components/OuterFrame";

const Add = () => {
    // title: string; leftButton?: Element | undefined; rightButton?: Element | undefined;
    const appbar = {
        title : "教科追加"
    }
    const snackbar = {

    };
    return (
        <OuterFrame appbar={appbar} snackbar={snackbar}>
            <Typography variant="h2">教科追加</Typography>
        </OuterFrame>
    )
};

export default Add;