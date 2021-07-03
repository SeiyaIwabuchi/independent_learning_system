import { MenuItem, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import router from "next/router";
import React, { useState } from "react";
import { ISessionId } from "../../query_param_shemas/SessionId";
import db from "../../models";
import { SubjectForm } from "../../form_schemas/ts/SubjectForm";
import OuterFrame from "../../components/OuterFrame";
import PlaySubjectMenuList from "../../components/PlaySubjectMenuList";

export const getServerSideProps: GetServerSideProps = async (context) => {
    let subjects: SubjectForm[] = [];
    await db.t_subjects.findAll()
        .then((subjects_) => {
            for (let r of subjects_) {
                subjects.push(
                    {
                        hash: r.hash,
                        name: r.name,
                        description: r.description
                    }
                );
            }
        });
    return {
        props: {
            subjects: subjects
        }
    }
};

const SubjectList = (props: ISessionId & { subjects: SubjectForm[] }) => {

    return (
        <OuterFrame appbar={{title:"教科一覧"}} snackbar={{}}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                    height: "110px",
                    justifyContent: "space-around"
                }}
            >
                <Typography variant="h4" align="center">教科一覧</Typography>
                <Typography variant="subtitle1" align="center">教科を選択すると復習を開始できます。</Typography>
                <Typography variant="subtitle1" align="center">以下、教科一覧です。</Typography>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "10px"
                }}>
                <PlaySubjectMenuList menuList={props.subjects} />
            </div>
        </OuterFrame>
    )
};

export default SubjectList;