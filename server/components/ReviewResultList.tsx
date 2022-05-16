import { ListItem, ListItemText, ListItemSecondaryAction, Divider, List, Checkbox, Typography } from "@material-ui/core";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ProblemForm } from "../form_schemas/ts/ProblemForm";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { dexieDb, IAnswerList } from "../models/dexie";

export interface IElemetPorps {
    resultProblem: IAnswerList
}

function Space() {
    return <>&nbsp;</>;
}
function Rlw(props: { str: string }) {
    // Replace leading whitespace
    return (
        <>
            {(props.str.match(/^\s+/) || [""])[0].split("").map(() => (
                <Space />
            ))}
            <>{props.str}</>
        </>
    );
}

const ReviewResultListElemet = (props: IElemetPorps) => {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        dexieDb.MarkList.get(props.resultProblem.hash)
            .then(e => {
                if(e != undefined){
                    setChecked(true);
                }else if(!props.resultProblem.isCollect){
                    dexieDb.MarkList.add(props.resultProblem);
                    setChecked(true)
                }
            });
    },[]);
    return (
        <>
            <ListItem
                key={props.resultProblem.hash}
            >
                {
                    props.resultProblem.problem_type == 0 ?
                        <Typography
                        // primary={props.resultProblem.problemBody}
                        >{props.resultProblem.problem_body.split("\n")
                            .map((v, i, a) => (
                                <>
                                    <Rlw str={v} />
                                    <br />
                                </>
                            ))}</Typography>
                        :
                        <img src={props.resultProblem.problem_image_url || "http://via.placeholder.com/500x300"} width="90%" height="auto"></img>
                }

                <div style={{ marginRight: "5px" }}>
                    {
                        props.resultProblem.isCollect ?
                            <CheckIcon color="primary" /> :
                            <CloseIcon color="secondary" />
                    }
                </div>
                <ListItemSecondaryAction>
                    <Checkbox onChange={async (event) => {
                        setChecked(event.target.checked);
                        if (event.target.checked)
                            await dexieDb.MarkList.add(props.resultProblem);
                        else
                            await dexieDb.MarkList.delete(props.resultProblem.hash);
                    }} checked={checked} />
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

const ReviewResultList = (
    props: {
        resultList: IAnswerList[]
    }) => {
    const resultList: JSX.Element[] = [];
    for (let i = 0; i < props.resultList.length; i++) {
        let prop = props.resultList[i];
        resultList.push(
            <ReviewResultListElemet resultProblem={prop} />
        );
        if (i < props.resultList.length - 1)
            resultList.push(<Divider />);
    }
    return (
        <List>
            {resultList}
        </List>
    )
};

export default ReviewResultList;