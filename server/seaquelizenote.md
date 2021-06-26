``` bash
npx sequelize model:create --name t_login_history `
--underscored  `
--attributes `
user_id:number, `
trial_date:date

npx sequelize model:create --name t_login_history `
--underscored 

npx sequelize model:create --name t_images --underscored --attributes image_path:text

npx sequelize model:create --name t_choices --underscored  --attributes problem_id:integer,choice_text:string,collect_flag:boolean,image_id:integer

npx sequelize model:create --name t_problems --underscored  --attributes hash:string,subject_id:integer,problem_type:integer,answer_type:integer,problem_body:string
```
- model/index.jsで作成したmodelのjsを読み込み、dbオブジェクトに追加する。
- tsの型定義からモデル作成コマンドを生成するものを作っても悪くないかも