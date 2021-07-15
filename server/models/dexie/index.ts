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
}
type problem = Table<IProblem,number>;

export interface IChecked{
    id: number,
    checked : {[key:string]: boolean}
}
type checked = Table<IChecked,number>

interface DBModel{
    problem_hash_order: problem_hash_order
    problem: problem
    checked: checked
}

export const dexieDb = new Dexie("db") as Dexie & DBModel;


// migrate
dexieDb.version(1).stores({
    problem_hash_order: "id",
    problem: "id",
    checked: "id",
});