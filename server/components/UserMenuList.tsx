import { ListItem, ListItemText, ListItemSecondaryAction, Divider, List, Checkbox } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { UserForm } from "../form_schemas/ts/UserForm";

export interface IElemetPorps{
    user:{
        id : number,
        name : string,
    },
    deleteList : [
        number[], 
        Dispatch<SetStateAction<number[]>>
       ]
}

const UserMenuListElemet = (props : IElemetPorps) => {
    return (
        <>
            <ListItem 
                button={true} 
                component="a" 
                href={`/Manage/User/Edit?&id=${props.user.id}`}
                key={props.user.id}
            >
                <ListItemText
                    primary={props.user.name}
                />
                <ListItemSecondaryAction>
                    <Checkbox onChange={
                        (event) => {
                            let deleteList = props.deleteList[0].slice();
                            if(deleteList.indexOf(props.user.id) == -1)
                                deleteList.push(props.user.id);
                            else
                                deleteList.splice( deleteList.indexOf(props.user.id), 1);
                            props.deleteList[1](deleteList);
                        }
                    }
                    checked={ props.deleteList[0].indexOf(props.user.id) != -1 }
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

const UserMenuList = (
    props : {
        menuList : UserForm[],
        deleteList:[
            number[], 
            Dispatch<SetStateAction<number[]>>
        ]
    }) => {
    const menu : JSX.Element[] = [];
    for(let i=0;i<props.menuList.length;i++){
        let prop = props.menuList[i];
        menu.push(
            <UserMenuListElemet user={prop} deleteList={props.deleteList}/>
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

export default UserMenuList;