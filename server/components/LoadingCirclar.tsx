import { CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect } from "react";

const LoadingCircular = (props : {
        isLoading? : boolean,
        setState? : React.Dispatch<React.SetStateAction<boolean>>,
        msg? : string
}) => {
    return (
        <div style={{
            opacity:0.8, 
            background:"#000000", 
            width:"100%", 
            height:"100vh", 
            position:"fixed", 
            left:0,
            top:0,
            zIndex:9999, 
            display:(props||{isLoading:false}).isLoading?"flex":"none", 
            flexDirection:"column",
            justifyContent:"space-around", 
            alignItems:"center"
            }}>
                <Typography variant="h2">{props.msg}</Typography>
                <CircularProgress color="inherit" size={80}/>
            </div>
    );
};
export default LoadingCircular;