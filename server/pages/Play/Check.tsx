import { Checkbox, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { List, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import React from "react";
import OuterFrame from "../../components/OuterFrame";
import ReviewResultList from "../../components/ReviewResultList";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {}
    }
};

const DummyList = [
    {
        problem: "問題１",
    },
    {
        problem: "問題２",
    },
    {
        problem: "問題３",
    },
    {
        problem: "問題４",
    },
];

export default () => {
    return (
        <>
            <OuterFrame appbar={{ title: "結果" }} snackbar={{}}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px",
                        height: "110px",
                        justifyContent: "space-around"
                    }}
                >
                    <Typography variant="h4" align="center">チェック問題一覧</Typography>
                    <Typography variant="subtitle1" align="center">チェックマークを付けた問題の一覧です。</Typography>
                    <Typography variant="subtitle1" align="center">チェックを外すとリストから削除されます。</Typography>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "10px"
                    }}>
                    <List>
                        {
                            DummyList.map(e => (
                                <ListItem>
                                    <ListItemText primary={e.problem} />
                                    <ListItemSecondaryAction>
                                        <Checkbox />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        }
                    </List>
                </div>
            </OuterFrame>
        </>
    )
};