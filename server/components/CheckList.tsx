import { ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from "@material-ui/core";
import React, { useState } from "react";
import { dexieDb, IMarkList } from "../models/dexie";

const CheckList = (props: { checkedList: IMarkList }) => {
    const [checked, setChecked] = useState(true);
    return (
        <ListItem>
            <ListItemText primary={props.checkedList.problem_body} />
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