import { ListItem, ListItemText, ListItemSecondaryAction, Divider, List, Checkbox } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { ProblemForm } from "../form_schemas/ts/ProblemForm";

export interface IElemetPorps{
    problem:{
        hash : string,
        problem_body : string | null,
    },
    deleteList : [
        string[], 
        Dispatch<SetStateAction<string[]>>
       ]
}

const ProblemMenuListElemet = (props : IElemetPorps) => {
    return (
        <>
            <ListItem 
                button={true} 
                component="a" 
                href={`/Manage/Problem/Edit?&hash=${props.problem.hash}`}
                key={props.problem.hash}
            >
                <ListItemText
                    primary={props.problem.problem_body}
                />
                <ListItemSecondaryAction>
                    <Checkbox onChange={
                        (event) => {
                            let deleteList = props.deleteList[0].slice();
                            if(deleteList.indexOf(props.problem.hash) == -1)
                                deleteList.push(props.problem.hash);
                            else
                                deleteList.splice( deleteList.indexOf(props.problem.hash), 1);
                            props.deleteList[1](deleteList);
                        }
                    }
                    checked={ props.deleteList[0].indexOf(props.problem.hash) != -1 }
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

const ProblemMenuList = (
    props : {
        menuList : ProblemForm[],
        deleteList:[
            string[], 
            Dispatch<SetStateAction<string[]>>
        ]
    }) => {
    const menu : JSX.Element[] = [];
    for(let i=0;i<props.menuList.length;i++){
        let prop = props.menuList[i];
        menu.push(
            <ProblemMenuListElemet problem={prop} deleteList={props.deleteList} key={prop.hash}/>
        );
        if(i < props.menuList.length -1)
            menu.push(<Divider />);
    }
    return (
        <List>
            {menu}
        </List>
    )
};

export default ProblemMenuList;