import { ListItem, ListItemText, ListItemSecondaryAction, Divider, List, Checkbox, Typography } from "@material-ui/core";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { ProblemForm } from "../form_schemas/ts/ProblemForm";

export interface IElemetPorps {
    problem: {
        hash: string,
        problem_body: string | null,
        problem_type: number | null,
        problem_image_url: string | null,
    },
    subject: {
        hash: string,
    },
    deleteList: [
        string[],
        Dispatch<SetStateAction<string[]>>
    ]
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

const ProblemMenuListElemet = (props: IElemetPorps) => {
    return (
        <Link href={`/Manage/Problem/Edit?problemHash=${props.problem.hash}&subjectHash=${props.subject.hash}`}>
            <ListItem
                button={true}
                key={props.problem.hash}
            >
                {
                    props.problem.problem_type == 0 ?
                    <Typography>{
                        (props.problem.problem_body || "").split("\n") //null対応
                            .map((v, i, a) => (
                                <>
                                    <Rlw str={v} />
                                    <br />
                                </>
                            ))
                    }</Typography>
                    :
                    <img src={props.problem.problem_image_url || "http://via.placeholder.com/500x300"} width="90%"></img>
                }
                {/* <ListItemText
                    primary={props.problem.problem_body}
                /> */}
                <ListItemSecondaryAction>
                    <Checkbox onChange={
                        (event) => {
                            let deleteList = props.deleteList[0].slice();
                            if (deleteList.indexOf(props.problem.hash) == -1)
                                deleteList.push(props.problem.hash);
                            else
                                deleteList.splice(deleteList.indexOf(props.problem.hash), 1);
                            props.deleteList[1](deleteList);
                        }
                    }
                        checked={props.deleteList[0].indexOf(props.problem.hash) != -1}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </Link>
    );
};

const ProblemMenuList = (
    props: {
        menuList: ProblemForm[],
        deleteList: [
            string[],
            Dispatch<SetStateAction<string[]>>
        ],
        subject: {
            hash: string,
        },
    }) => {
    const menu: JSX.Element[] = [];
    for (let i = 0; i < props.menuList.length; i++) {
        let prop = props.menuList[i];
        menu.push(
            <ProblemMenuListElemet subject={props.subject} problem={prop} deleteList={props.deleteList} key={prop.hash} />
        );
        if (i < props.menuList.length - 1)
            menu.push(<Divider />);
    }
    return (
        <List>
            {menu}
        </List>
    )
};

export default ProblemMenuList;