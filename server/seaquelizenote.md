``` bash
npx sequelize model:create --name t_login_history `
--underscored  `
--attributes `
user_id:number, `
trial_date:date

npx sequelize model:create --name t_login_history `
--underscored 
```
- model/index.jsで作成したmodelのjsを読み込み、dbオブジェクトに追加する。
- tsの型定義からモデル作成コマンドを生成するものを作っても悪くないかも