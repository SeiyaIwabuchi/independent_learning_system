import { ListItem, ListItemText, ListItemSecondaryAction, Divider, List, Checkbox } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { ProblemForm } from "../form_schemas/ts/ProblemForm";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

export interface IElemetPorps {
    resultProblem: { problem: string, isCollect: boolean }
}

const ReviewResultListElemet = (props: IElemetPorps) => {
    return (
        <>
            <ListItem
                key={props.resultProblem.problem}
            >
                <ListItemText
                    primary={props.resultProblem.problem}
                />
                <div style={{marginRight:"5px"}}>
                    {
                        props.resultProblem.isCollect ?
                            <CheckIcon color="primary" /> :
                            <CloseIcon color="secondary" />
                    }
                </div>
                <ListItemSecondaryAction>
                    <Checkbox />
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

const ReviewResultList = (
    props: {
        resultList: { problem: string, isCollect: boolean }[]
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