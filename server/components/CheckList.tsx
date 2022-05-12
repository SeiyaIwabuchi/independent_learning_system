import { ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from "@material-ui/core";
import React, { useState } from "react";
import { dexieDb, IMarkList } from "../models/dexie";

const CheckList = (props: { checkedList: IMarkList }) => {
    const [checked, setChecked] = useState(true);
    return (
        <ListItem key={props.checkedList.hash}>
            {
                props.checkedList.problem_type == 0 ?
                <ListItemText primary={props.checkedList.problem_body} />
                :
                <img src={props.checkedList.problem_image_url || "http://via.placeholder.com/500x300"} width="90%" height="auto"></img>
            }
            <ListItemSecondaryAction>
                <Checkbox
                    checked={checked}
                    onChange={async (event) => {
                        setChecked(event.target.checked);
                        if (event.target.checked)
                            await dexieDb.MarkList.add(props.checkedList);
                        else
                            await dexieDb.MarkList.delete(props.checkedList.hash);
                    }}
                />
            </ListItemSecondaryAction>
        </ListItem>
    )

}
export default CheckList;