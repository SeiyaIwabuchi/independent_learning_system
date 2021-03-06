import { ListItem, ListItemText, ListItemSecondaryAction, Divider, List, Checkbox } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { SubjectForm } from "../form_schemas/ts/SubjectForm";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Link from "next/link";

export interface IElemetPorps {
    subject: {
        hash: string,
        name: string,
        description?: string,
    },
}

const SubjectMenuListElemet = (props: IElemetPorps) => {
    return (
        <Link href={`/Play/Option?subjectHash=${props.subject.hash}`}>
            <ListItem
                button={true}
                key={props.subject.hash}
            >
                <ListItemText
                    primary={props.subject.name}
                    secondary={props.subject.description!}
                />
                <ListItemSecondaryAction>
                    <ChevronRightIcon />
                </ListItemSecondaryAction>
            </ListItem>
        </Link>
    );
};

const PlaySubjectMenuList = (
    props: {
        menuList: SubjectForm[],
    }) => {
    const menu: JSX.Element[] = [];
    for (let i = 0; i < props.menuList.length; i++) {
        let prop = props.menuList[i];
        menu.push(
            <SubjectMenuListElemet subject={prop} key={prop.hash} />
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

export default PlaySubjectMenuList;