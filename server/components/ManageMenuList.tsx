import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Divider, List } from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { ReactNode } from "react";
import Link from "next/link";

export interface IElemetPorps{
    primaryText : string,
    secondaryText? : string,
    destinationURL?: string
}

const ManageMenuListElemet = (props : IElemetPorps) => {
    return (
        <>
            <ListItem button={true} component="a" href={`${props.destinationURL  || "#" }`}>
                <ListItemText
                    primary={props.primaryText}
                    secondary={props.secondaryText || null}
                />
                <ListItemSecondaryAction>
                    <ChevronRightIcon />
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

const ManageMenuList = (props : {menuList : IElemetPorps[]}) => {
    const menu : JSX.Element[] = [];
    for(let i=0;i<props.menuList.length;i++){
        let prop = props.menuList[i];
        menu.push(
            <ManageMenuListElemet primaryText={prop.primaryText} secondaryText={prop.secondaryText} destinationURL={prop.destinationURL}/>
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

export default ManageMenuList;