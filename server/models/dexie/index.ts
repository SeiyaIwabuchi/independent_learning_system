// https://b-risk.jp/blog/2020/07/indexeddb_and_dexie/#DB
// ↑はdexieの分かりやすい使い方
import Dexie, { IndexableType, Table } from "dexie";


interface IProblem_hash_order{
    id:number,
    hash:string
}
type problem_hash_order = Table<IProblem_hash_order,number>;

interface DBModel{
    problem_hash_order: problem_hash_order
}

export const dexieDb = new Dexie("db") as Dexie & DBModel;


// 
dexieDb.version(1).stores({
    problem_hash_order: "id, &hash",
});