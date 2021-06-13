import { Model, BuildOptions } from 'sequelize';

/* モデルの数作成する */
// interface MemberModel extends Model {
//     readonly id: number;
//     name: string;
//     readonly created_at: date;
//     readonly updated_at: date;
// }

interface t_usersModel extends Model {
    readonly id: number;
    login_id: string;
    password: string;
    readonly created_at: date;
    readonly updated_at: date;
}

// type MemberModelStatic = typeof Model & {
//     new (values?: object, options?: BuildOptions): MemberModel;
// }

type t_usersModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): t_usersModel;
}
/* --------------- */

interface DBModel {
    // member: MemberModelStatic;
    t_users : t_usersModelStatic;
}

declare const db: DBModel;
export = db;