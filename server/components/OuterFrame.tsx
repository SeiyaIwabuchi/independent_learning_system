import { AppBar, Toolbar, IconButton, Typography, Button, Snackbar } from "@material-ui/core";
import React from "react";
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from "react";

interface IProps {
    appbar: {
        title : string,
        leftButton? : JSX.Element,
        rightButton? : JSX.Element
    },
    snackbar:{
        state? : boolean,
        setState? : React.Dispatch<React.SetStateAction<boolean>>,
        msg? : string
    },
    children:JSX.Element | JSX.Element[]
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
                    <div style={{marginLeft:"auto",marginRight:"0px"}}>{props.appbar.rightButton}</div>
                </Toolbar>
            </AppBar>
            <div style={{
                marginTop:"80px",
                marginRight:"10px",
                marginLeft : "10px"
                }}>
                {props.children}
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={props.snackbar.state}
                onClose={ () => {
                    if(props.snackbar.setState != undefined) props.snackbar.setState(false)
                }}
                message={props.snackbar.msg}
                key={"bottomleft"}
            />
        </>
    );
}
export default OuterFrame;