export type SubjectForm = {
    hash : string,
    name : string,
    description : string
}

export type SubjectForm_PUT = {
    id : number,
    hash : string,
    name : string,
    description : string
}

export type SubjectForm_POST = {
    name : string,
    description : string
}

export type SubjectForm_DELETE = {
    hash : string,
    name : string,
}[]