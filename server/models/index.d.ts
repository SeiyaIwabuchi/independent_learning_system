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
    name: string;
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

export interface t_problems extends Model {
    readonly id: number;
    hash : string;
    subject_id : number;
    problem_type : number;
    answer_type : number;
    problem_body : string;
    readonly created_at: date;
    readonly updated_at: date;
}

export interface t_choices extends Model {
    readonly id: number;
    problem_id : number;
    choice_text : string;
    collect_flag : boolean;
    image_id : number | null;
    readonly created_at: date;
    readonly updated_at: date;
}

export interface t_images extends Model {
    readonly id: number;
    image_path : string;
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

type t_problemModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): t_problems;
}

type t_choiceModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): t_choices;
}

type t_imageModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): t_images;
}
/* --------------- */

interface DBModel {
    // member: MemberModelStatic;
    t_users : t_usersModelStatic;
    t_login_histories : t_login_historiesModelStatic;
    t_sessions: t_sessionsModelStatic;
    t_subjects: t_subjectModelStatic;
    t_problems: t_problemModelStatic;
    t_choices: t_choiceModelStatic;
    t_images: t_imageModelStatic;
}

declare const db: DBModel;
export = db;