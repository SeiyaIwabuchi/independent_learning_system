import Ajv from "ajv";
export default (schema: boolean | object,data: any) => {
    return new Ajv().compile(schema)(data);
};