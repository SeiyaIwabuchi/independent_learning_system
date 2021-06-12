import { AppBar, Toolbar, IconButton, Typography, Button, Snackbar } from "@material-ui/core";
import React from "react";
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from "react";

interface IProps {
    appbar: {
        title: string,
        leftButton: JSX.Element,
        rightButton: JSX.Element
    },
    snackbar:{
        state:boolean,
        setState:React.Dispatch<React.SetStateAction<boolean>>,
        msg:string
    },
    children:JSX.Element
}

const OuterFrame = (props: IProps) => {
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    {props.appbar.leftButton}
                    <Typography variant="h6" >
                        {props.appbar.title}
                    </Typography>
                    {props.appbar.rightButton}
                </Toolbar>
            </AppBar>
            <div style={{marginTop:"60px"}}>
                {props.children}
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={props.snackbar.state}
                onClose={ () => {props.snackbar.setState(false)}}
                message={props.snackbar.msg}
                key={"bottomleft"}
            />
        </>
    );
}
export default OuterFrame;