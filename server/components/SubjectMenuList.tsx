import { ListItem, ListItemText, ListItemSecondaryAction, Divider, List, Checkbox } from "@material-ui/core";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { SubjectForm } from "../form_schemas/ts/SubjectForm";

export interface IElemetPorps{
    subject:{
        hash : string,
        name : string,
        description? : string,
    },
    deleteList : [
        string[], 
        Dispatch<SetStateAction<string[]>>
       ]
}

const SubjectMenuListElemet = (props : IElemetPorps) => {
    return (
        <Link href={`/Manage/Subject/Edit?&hash=${props.subject.hash}`}>
            <ListItem 
                button={true} 
                key={props.subject.hash}
            >
                <ListItemText
                    primary={props.subject.name}
                    secondary={props.subject.description!}
                />
                <ListItemSecondaryAction>
                    <Checkbox onChange={
                        (event) => {
                            let deleteList = props.deleteList[0].slice();
                            if(deleteList.indexOf(props.subject.hash) == -1)
                                deleteList.push(props.subject.hash);
                            else
                                deleteList.splice( deleteList.indexOf(props.subject.hash), 1);
                            props.deleteList[1](deleteList);
                        }
                    }
                    checked={ props.deleteList[0].indexOf(props.subject.hash) != -1 }
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </Link>
    );
};

const SubjectMenuList = (
    props : {
        menuList : SubjectForm[],
        deleteList:[
            string[], 
            Dispatch<SetStateAction<string[]>>
        ]
    }) => {
    const menu : JSX.Element[] = [];
    for(let i=0;i<props.menuList.length;i++){
        let prop = props.menuList[i];
        menu.push(
            <SubjectMenuListElemet subject={prop} deleteList={props.deleteList} key={prop.hash}/>
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

export default SubjectMenuList;