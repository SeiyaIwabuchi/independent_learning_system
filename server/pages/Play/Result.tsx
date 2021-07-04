import { Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import React from "react";
import OuterFrame from "../../components/OuterFrame";
import ReviewResultList from "../../components/ReviewResultList";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props:{}
    }
};

const DummyResultList = [
    {
        problem:"問題１",
        isCollect: true
    },
    {
        problem:"問題２",
        isCollect: false
    },
    {
        problem:"問題３",
        isCollect: true
    },
    {
        problem:"問題４",
        isCollect: false
    },
];

const List = () => {
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
                    <Typography variant="h4" align="center">{"{教科名}"}</Typography>
                    <Typography variant="subtitle1" align="center">N問中M問正解</Typography>
                    <Typography variant="subtitle1" align="center">L%正解</Typography>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "10px"
                    }}>
                    <ReviewResultList resultList={DummyResultList} />
                </div>
            </OuterFrame>
        </>
    )
};

export default List;