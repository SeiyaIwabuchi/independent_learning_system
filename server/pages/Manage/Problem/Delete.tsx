import { Button, Divider, List, ListItemText } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import router from "next/router";
import React from "react";
import { Op } from "sequelize";
import ManagementCommon, { LAYOUT_TYPE } from "../../../components/ManagementCommon";
import db from "../../../models";
import { ISessionId } from "../../../query_param_shemas/SessionId";
import SessionIdValidater from "../../../utils/SessionIdValidater";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const deleteList = JSON.parse(context.query.list as string);
    let problemList: { "hash": string, "problem_body": string }[] = [];
    await db.t_problems.findAll({
        attributes: ["problem_body", "hash"],
        where: {
            hash: {
                [Op.in]: deleteList
            }
        }
    }).then((r) => {
        for(let rr of r){
            problemList.push(
                {
                    "hash": rr.hash,
                    "problem_body": rr.problem_body
                }
            );
        }
    })
    return {
        props: {
            sessionId: await SessionIdValidater(context),
            problemList: problemList
        }
    }
};

const Delete = (props: ISessionId & { problemList: { "hash": string, "problem_body": string }[] }) => {
    return (
        <ManagementCommon pageTitle="問題削除" pageLayoutType={LAYOUT_TYPE.EDIT} sessionId={props.sessionId} disableRightButton>
            <div style={{display : "flex",alignItems:"center", flexDirection : "column"}}>
                <Typography variant="h3">確認</Typography>
                <Typography variant="body1">以下の問題を削除します。</Typography>
                <List>
                    {(() => {
                        return props.problemList.map((r) => {
                            return <><ListItem><ListItemText primary={r.problem_body}></ListItemText></ListItem><Divider/></>
                        });
                    })()}
                </List>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ width: "100%" }}
                    onClick={async () => {
                        await fetch(
                            "/api/Problem",
                            {
                                method : "delete",
                                body : JSON.stringify(props.problemList)
                            }
                        ).then(() => {
                            router.push("/Manage/Problem/List");
                        }).catch((err) => {
                            alert(err);
                            console.log(err);
                            router.push("/Manage/Problem/List");
                        });
                    }}>
                    {"削除"}
                </Button>
            </div>
        </ManagementCommon>
    )
};

export default Delete;