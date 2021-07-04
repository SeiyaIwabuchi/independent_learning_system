import { Button, ListItem, ListItemSecondaryAction, ListItemText, Switch } from "@material-ui/core";
import { List, Typography } from "@material-ui/core"
import React from "react";
import OuterFrame from "../../components/OuterFrame";

const SubjectList = (props: {}) => {
    return (
        <OuterFrame appbar={{ title: "オプション" }} snackbar={{}}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                    height: "110px",
                    justifyContent: "space-around"
                }}
            >
                <Typography variant="h4" align="center">オプション設定</Typography>
                <Typography variant="subtitle1" align="center"></Typography>
                <Typography variant="subtitle1" align="center"></Typography>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "10px"
                }}>
                <List>
                    <ListItem>
                        <ListItemText
                            primary={"問題の出題順をランダムにする。"}
                        />
                    <ListItemSecondaryAction>
                        <Switch />
                    </ListItemSecondaryAction>
                    </ListItem>
                </List>
                <Button variant="contained" color="primary">開始</Button>
            </div>
        </OuterFrame>
    )
}

export default SubjectList;