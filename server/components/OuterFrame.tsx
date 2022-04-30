import { AppBar, Toolbar, Typography, Snackbar, CircularProgress } from "@material-ui/core";
import React, { ReactNode, useEffect } from "react";
import LoadingCircular from "./LoadingCirclar";



interface IProps {
    appbar : {
        title : string,
        leftButton? : ReactNode,
        rightButton? : ReactNode
    },
    snackbar : {
        state? : boolean,
        setState? : React.Dispatch<React.SetStateAction<boolean>>,
        msg? : string
    },
    loading_circle? : {
        state? : boolean
    },
    children:ReactNode
}

const OuterFrame = (props: IProps) => {
    return (
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
            <LoadingCircular isLoading={
                (()=>{
                    if(!props.loading_circle) return false;
                    else if(!props.loading_circle.state) false;
                    else return props.loading_circle.state;
                })()
            } msg={"読み込み中です。"}/>
            <AppBar position="fixed">
                <Toolbar>
                    {props.appbar.leftButton}
                    <Typography variant="h6" style={{marginLeft:"10px"}}>
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
        </div>
        );
}
export default OuterFrame;