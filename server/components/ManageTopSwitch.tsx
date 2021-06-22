import { ReactNode } from "react";

interface IProps{
    isShow : boolean
    children? : ReactNode
}
const ManageTopSwitch = (props : IProps) => {
    return (
        <>
            { 
                props.isShow ?
                props.children : <></>
            }
        </>
    );
};
export default ManageTopSwitch;