export type ProblemForm = {
    hash : string,
    subject_id : number | null,
    problem_type : number | null,
    answer_type : number | null,
    problem_body : string | null,
};

export type problem_POST = {
    'problem_type' : number;
    'answer_type' : number;
    'problem_body' : string;
    'subjectHash': string;
    'choices' : {
        choice_text: string | null,
        collect_flag: boolean,
        image_id: string | null,
    }[]
};

type problem_PUT = {
    'hash' : string;
    'problem_type' : number;
    'answer_type' : number;
    'problem_body' : string;
    'subjectHash'?: string;
    'choices' : {
        id: number,
        problem_id: number,
        choice_text: string | null,
        collect_flag: boolean,
        image_id: string | null,
    }[]
};

type problem_DELETE = string[];