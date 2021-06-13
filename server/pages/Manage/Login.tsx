import { GetServerSideProps } from "next";
import querystring from "querystring";

export  const getServerSideProps : GetServerSideProps = async (context) => {
    let body = "";
    for(let i=0;i<context.req.readableLength;i++){
        body += context.req.read();
    }
    console.log(querystring.parse(body));
    return {
        props:{
            sessionId:body
        }
    }
}

interface IProps{
    sessionId:string
}

const Login = (props : IProps) => {
    return (
        <p>{props.sessionId}</p>
    );
};

export default Login;