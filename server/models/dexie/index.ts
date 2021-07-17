// https://b-risk.jp/blog/2020/07/indexeddb_and_dexie/#DB
// ↑はdexieの分かりやすい使い方
import Dexie, { IndexableType, Table } from "dexie";

export interface IProblem_hash_order{
    id:number,
    hash:string
}
type problem_hash_order = Table<IProblem_hash_order,number>;

export interface IChoices{
    id: string,
    problem_id: number,
    choice_text: string,
    collect_flag: boolean,
    image_id: number
}
export interface IProblem{
    id: number;
    hash : string;
    subject_id : number;
    problem_type : number;
    answer_type : number;
    problem_body : string;
    choices : IChoices[];
    subject_name: string;
}
type problem = Table<IProblem,number>;

export interface IChecked{
    id: number,
    checked : {[key:string]: boolean}
}
type checked = Table<IChecked,number>

export interface ICurrentProblem{
    id: number
}
type currentProblem = Table<ICurrentProblem,number>

export interface IAnswerList{
    hash: string,
    problemBody: string,
    isCollect: boolean
}
type answerList = Table<IAnswerList,string>

export interface IMarkList{
    hash: string,
    problemBody: string,
    isCollect: boolean
}
type MarkList = Table<IMarkList,string>

export interface ITheme{
    themeType: string;
}
type Theme = Table<ITheme,string>

interface DBModel{
    problem_hash_order: problem_hash_order
    problem: problem
    checked: checked
    currentProblem: currentProblem
    answerList: answerList
    MarkList: MarkList
    Theme: Theme
}

export const dexieDb = new Dexie("db") as Dexie & DBModel;


// migrate
dexieDb.version(1).stores({
    problem_hash_order: "id",
    problem: "id",
    checked: "id",
    currentProblem: "id",
    answerList: "hash",
    MarkList: "hash",
    Theme: "themeType"
});