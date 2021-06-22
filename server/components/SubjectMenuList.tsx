import { ListItem, ListItemText, ListItemSecondaryAction, Divider, List, Checkbox } from "@material-ui/core";
import React, { ReactNode } from "react";
import { SessionId } from "../query_param_shemas/SessionId";

export interface IElemetPorps{
    primaryText : string,
    secondaryText? : string,
    destinationURL?: string,
    sessionId : string
}

const SubjectMenuListElemet = (props : IElemetPorps) => {
    return (
        <>
            <ListItem button={true} component="a" href={`/Manage/Subject/Edit?${SessionId({sessionId:props.sessionId})}&name=${props.primaryText}`}>
                <ListItemText
                    primary={props.primaryText}
                    secondary={props.secondaryText || null}
                />
                <ListItemSecondaryAction>
                    <input type="checkbox" />
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

const SubjectMenuList = (props : {menuList : IElemetPorps[]}) => {
    const menu : JSX.Element[] = [];
    for(let i=0;i<props.menuList.length;i++){
        let prop = props.menuList[i];
        menu.push(
            <SubjectMenuListElemet 
            primaryText={prop.primaryText} 
            secondaryText={prop.secondaryText} 
            destinationURL={prop.destinationURL}
            sessionId={prop.sessionId}
            />
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