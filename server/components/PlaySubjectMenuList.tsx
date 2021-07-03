import { ListItem, ListItemText, ListItemSecondaryAction, Divider, List, Checkbox } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { SubjectForm } from "../form_schemas/ts/SubjectForm";

export interface IElemetPorps{
    subject:{
        hash : string,
        name : string,
        description? : string,
    },
}

const SubjectMenuListElemet = (props : IElemetPorps) => {
    let deleteList:any[] = [];
    return (
        <>
            <ListItem 
                button={true} 
                component="a" 
                href={`/Play/Option?hash=${props.subject.hash}`}
                key={props.subject.hash}
            >
                <ListItemText
                    primary={props.subject.name}
                    secondary={props.subject.description!}
                />
                <ListItemSecondaryAction>
                    <Checkbox onChange={
                        (event) => {
                            if(deleteList.indexOf(props.subject.hash) == -1)
                                deleteList.push(props.subject.hash);
                            else
                                deleteList.splice( deleteList.indexOf(props.subject.hash), 1);
                        }
                    }
                    checked={ deleteList.indexOf(props.subject.hash) != -1 }
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

const PlaySubjectMenuList = (
    props : {
        menuList : SubjectForm[],
    }) => {
    const menu : JSX.Element[] = [];
    for(let i=0;i<props.menuList.length;i++){
        let prop = props.menuList[i];
        menu.push(
            <SubjectMenuListElemet subject={prop} key={prop.hash}/>
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

export default PlaySubjectMenuList;