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
    let subjectList: { "hash": string, "name": string }[] = [];
    db.t_subjects.findAll({
        attributes: ["name", "hash"],
        where: {
            hash: {
                [Op.in]: deleteList
            }
        }
    }).then((r) => {
        for(let rr of r){
            subjectList.push(
                {
                    "hash": rr.hash,
                    "name": rr.name
                }
            );
        }
    })
    return {
        props: {
            sessionId: await SessionIdValidater(context),
            subjectList: subjectList
        }
    }
};

const Delete = (props: ISessionId & { subjectList: { "hash": string, "name": string }[] }) => {
    return (
        <ManagementCommon pageTitle="教科追加" pageLayoutType={LAYOUT_TYPE.EDIT} sessionId={props.sessionId} disableRightButton>
            <div style={{display : "flex",alignItems:"center", flexDirection : "column"}}>
                <Typography variant="h3">確認</Typography>
                <Typography variant="body1">以下の教科を削除します。</Typography>
                <List>
                    {(() => {
                        return props.subjectList.map((r) => {
                            return <><ListItem><ListItemText primary={r.name}></ListItemText></ListItem><Divider/></>
                        });
                    })()}
                </List>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ width: "100%" }}
                    onClick={async () => {
                        await fetch(
                            "/api/Subject",
                            {
                                method : "delete",
                                body : JSON.stringify(props.subjectList)
                            }
                        ).then(() => {
                            router.push("/Manage/Subject/List");
                        }).catch((err) => {
                            alert(err);
                            console.log(err);
                            router.push("/Manage/Subject/List");
                        });
                    }}>
                    {"削除"}
                </Button>
            </div>
        </ManagementCommon>
    )
};

export default Delete;