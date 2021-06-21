import { ListItem, ListItemText, ListItemSecondaryAction, Divider, List, Checkbox } from "@material-ui/core";
import React from "react";

export interface IElemetPorps{
    primaryText : string,
    secondaryText? : string,
    destinationURL?: string
}

const SubjectMenuListElemet = (props : IElemetPorps) => {
    return (
        <>
            <ListItem button={true} component="a" href={`${props.destinationURL  || "#" }`}>
                <ListItemText
                    primary={props.primaryText}
                    secondary={props.secondaryText || null}
                />
                <ListItemSecondaryAction>
                <Checkbox
                    edge="end"
                    color="primary"
                />
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

const SubjectMenuList = (props : {menuList : IElemetPorps[]}) => {
    const menu : JSX.Element[]= [];
    for(let i=0;i<props.menuList.length;i++){
        let prop = props.menuList[i];
        menu.push(
            <SubjectMenuListElemet primaryText={prop.primaryText} secondaryText={prop.secondaryText} destinationURL={prop.destinationURL}/>
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