import { Checkbox, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { List, ListItem } from "@material-ui/core";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import OuterFrame from "../../components/OuterFrame";

const subjects = [
    {
        name:"教科名1"
    },
    {
        name:"教科名2"
    },
    {
        name:"教科名3"
    },
    {
        name:"教科名4"
    }
];

const problem = [
    {
        subject: "教科名",
        problem:"問題"
    },
    {
        subject: "教科名",
        problem:"問題"
    },
    {
        subject: "教科名",
        problem:"問題"
    },
];

const ProblemList = () => {
    const [selectedSubject, setSelectedSubject] = useState("教科名1");
    return (
        <OuterFrame appbar={{ title: "問題一覧" }} snackbar={{}}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "10px"
                }}>
                <FormControl variant="filled">
                    <InputLabel id="demo-simple-select-outlined-label">教科</InputLabel>
                    <Select
                        onChange={(event) => {
                            //router.push(`${router.pathname}?subjectHash=${event.target.value}`)
                        }}
                        value={selectedSubject}
                    >
                        <MenuItem value="">
                            <em>未選択</em>
                        </MenuItem>
                        {subjects.map(sub => (<MenuItem value={sub.name}>{sub.name}</MenuItem>))}
                    </Select>
                </FormControl>
                <List>
                    {problem.map(e => (
                        <ListItem>
                           <ListItemText primary={e.problem} /> 
                           <ListItemSecondaryAction>
                                <Checkbox />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </div>
        </OuterFrame>
    );
};

export default ProblemList;