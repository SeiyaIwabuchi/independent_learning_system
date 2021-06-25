import { Model, BuildOptions } from 'sequelize';

/* モデルの数作成する */
// interface MemberModel extends Model {
//     readonly id: number;
//     name: string;
//     readonly created_at: date;
//     readonly updated_at: date;
// }

export interface t_usersModel extends Model {
    readonly id: number;
    login_id: string;
    password: string;
    readonly created_at: date;
    readonly updated_at: date;
}

export interface t_login_histories extends Model {
    readonly id: number;
    user_name: string;
    trial_date: Date;
    readonly created_at: date;
    readonly updated_at: date;
}

export interface t_sessions extends Model {
    readonly id: number;
    user_id : number;
    login_history_id :number;
    readonly created_at: date;
    readonly updated_at: date;
}

export interface t_subjects extends Model {
    readonly id: number;
    hash : string;
    name: string;
    description : string;
    readonly created_at: date;
    readonly updated_at: date;
}
// type MemberModelStatic = typeof Model & {
//     new (values?: object, options?: BuildOptions): MemberModel;
// }

type t_usersModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): t_usersModel;
}

type t_login_historiesModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): t_login_histories;
}

type t_sessionsModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): t_sessions;
}

type t_subjectModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): t_subjects;
}
/* --------------- */

interface DBModel {
    // member: MemberModelStatic;
    t_users : t_usersModelStatic;
    t_login_histories : t_login_historiesModelStatic;
    t_sessions: t_sessionsModelStatic;
    t_subjects: t_subjectModelStatic;
}

declare const db: DBModel;
export = db;