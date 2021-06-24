import { ListItem, ListItemText, ListItemSecondaryAction, Divider, List, Checkbox } from "@material-ui/core";
import React, { Dispatch, ReactNode, SetStateAction, useContext } from "react";
import { SessionId } from "../query_param_shemas/SessionId";
import { UserContext } from "./ManagementCommon";

export interface IElemetPorps{
    subject:{
        id : number,
        primaryText : string,
        secondaryText? : string,
        destinationURL?: string,
    },
    deleteList : [
        number[], 
        Dispatch<SetStateAction<number[]>>
       ]
}

const SubjectMenuListElemet = (props : IElemetPorps) => {
    const userContext = useContext(UserContext);
    return (
        <>
            <ListItem 
                button={true} 
                component="a" 
                href={`/Manage/Subject/Edit?${SessionId(userContext.sessionId)}&name=${props.subject.primaryText}`}
            >
                <ListItemText
                    primary={props.subject.primaryText}
                    secondary={props.subject.secondaryText || null}
                />
                <ListItemSecondaryAction>
                    <input type="checkbox" onChange={
                        (event) => {
                            let deleteList = props.deleteList[0].slice();
                            if(deleteList.indexOf(props.subject.id) == -1)
                                deleteList.push(props.subject.id);
                            else
                                deleteList.splice( deleteList.indexOf(props.subject.id), 1);
                            props.deleteList[1](deleteList);
                        }
                    }
                    checked={ props.deleteList[0].indexOf(props.subject.id) != -1 }
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

const SubjectMenuList = (
    props : {
        menuList : {
             id: number; 
             primaryText: string,
             secondaryText: string
             }[],
             deleteList:[
                 number[], 
                 Dispatch<SetStateAction<number[]>>
                ]
            }) => {
    const menu : JSX.Element[] = [];
    for(let i=0;i<props.menuList.length;i++){
        let prop = props.menuList[i];
        menu.push(
            <SubjectMenuListElemet subject={prop} deleteList={props.deleteList}/>
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