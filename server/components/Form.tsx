import { Button } from "@material-ui/core";
import { AjvError, ErrorSchema, FormProps, FormValidation, IChangeEvent, UiSchema } from "@rjsf/core";
import Form_ from "@rjsf/material-ui";
import router from "next/router";
import React, { useState } from "react";


interface IProps{
    action? : string,
    method? : string,
    schema : any,
    uiSchema? : UiSchema,
    submitButtonName? : string,
    onChange? : (e: IChangeEvent<any>, es?: ErrorSchema | undefined) => any,
    formData? : any,
    autoComplete? : string,
    onSubmit? : (args? : any) => any,
    dataDest : string,
    screenTraDest? : string,
    onApiRes? : (json : any) => any,
    onApiError? : (err : any) => any,
    validate? : (formData: any, errors: FormValidation) => FormValidation,
    transformErrors? : (errors: AjvError[]) => AjvError[],
    name? : string,
    id? : string,
    children? : JSX.Element[] | JSX.Element,
}

let errors_ : any = [""];
const Form = (props : IProps) => {
    const [formData,setFormData] = useState<any>();
    const [isValid,setIsvalid] = useState(false);
    const onSubmit = async () => {
        const formData_ = 
            props.formData == undefined ? 
            formData : props.formData;
        await fetch(props.dataDest,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(formData_)
        })
        .then(res => res.json())
        .then(props.onApiRes)
        .then( () => {
            if(props.screenTraDest != undefined)
                router.push(props.screenTraDest,undefined);
        })
        .catch(props.onApiError)
    };
    const transformErrors = (errors : AjvError[]) => {
        errors_ = errors;
        return errors.map(
            (error) => {
                if(error.name == "required") error.message="必須項目です";
                return error;
                }
            );
    };
    return (
        <Form_ 
            schema={props.schema} 
            uiSchema={props.uiSchema} 
            action={props.action}
            onChange = { (event : FormProps<any>) => {
                    if(props.onChange == undefined){
                        setFormData(event.formData);
                    }else{
                        props.onChange(event.formData)
                    }
                    if(props.validate != undefined) {
                        console.log(event);
                        // props.validate(event.formData)
                    }
                }
            }
            formData={
                props.formData || formData
            }
            autoComplete={props.autoComplete}
            validate={props.validate}
            transformErrors={
                props.transformErrors || transformErrors
            }
            liveValidate
            showErrorList={false}
            name = {props.name}
            method = {props.method}
            id = {props.id}
        >
            {props.children}
            <div　
            style={{
                display:"flex",
                justifyContent:"center",
                marginTop:"30px",
            }}>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    onClick={
                        props.onSubmit || onSubmit
                    }
                    disabled={
                        !(errors_.length == 0)
                    }
                    style={{
                        width:"100%"
                    }}
                    >{
                    props.submitButtonName || "送信"
            }</Button>
            </div>
        </Form_>
    );
};

export default Form;