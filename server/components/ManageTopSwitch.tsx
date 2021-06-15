interface IProps{
    isShow : boolean
    children? : JSX.Element[]
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