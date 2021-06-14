# 自主学習システム
# これはなに？
- 自主学習をするためのシステムを提供します。
# 機能
- 縦画面のスマートフォン向け
- (PC画面にも対応)
- インスタントユーザ
    - 問題を解くのには認証などは不要である。
    - 点数や復習済みリストの保存はローカルストレージに保存する。
- 管理ユーザ
    - 教科や問題管理に関する操作はユーザ認証が必要である。
    - 既存の管理ユーザは新たな管理ユーザを作成、削除できる。
        - ユーザ作成後の初回ログイン時にパスワードの再設定を求められる。
            - 一定時間内に再設定されなかった場合、ユーザは削除される。
    - （ユーザにロールの設定ができる。）
- 復習
    - 教科別に登録されている問題を回答できる。
        - 問題の種類
            - 多肢選択式（複数、択一）
            - テキスト入力（完全一致、単語の存在）
        - 選択式の問題と選択肢には画像とテキストが使える。
    - 教科別の点数と復習済み問題を一定期間保持する。
    - 出題順番をシャッフルできる。
    - 途中で回答を終了できる。
    - 途中経過を保存できる。
    - 問題は最初からまたは途中から開始できる。
- 問題・教科管理
    - 教科を追加、変更、削除できる。
    - 問題は教科ごとに存在する。
    - 問題を追加、変更、削除できる。
    - 問題はデータベースに保存する。
    - 教科や問題に関するデータをJSON形式で書き出しできる。

# 環境
- Nextjs
- MySQL
- Sequelize ORM
- SQLite(学校のPCで開発するとき)

# 画面遷移図
- 復習時の画面遷移
``` plantuml
@startuml
[*] --> 教科一覧 : "/"にアクセス
教科一覧 --> オプション選択 : 復習ボタン押下
オプション選択 --> 問題回答 : 開始ボタン押下
問題回答 --> 正誤確認 : 回答ボタン押下
正誤確認 --> 問題回答 : 次の問題ボタン押下
正誤確認 --> 結果 : 終了ボタン押下
結果 --> 教科一覧 : 終了ボタン押下
教科一覧 --> [*] : 利用終了
教科一覧 --> 続き選択 : 前回の復習を終了していない場合
続き選択 --> 問題回答 : 続きボタン押下
続き選択 --> 問題回答 : 最初からボタン押下
問題回答 --> 教科一覧 : 一時中断ボタン押下
問題回答 --> 問題回答 : 前の問題ボタン押下
@enduml
```
- 管理画面
    - ログイン時
    ``` plantuml
    @startuml
    [*] --> ログイン : /loginにアクセス
    ログイン --> 管理トップ : ログインボタン押下 成功時
    ログイン --> ログイン : ログインボタン押下 失敗時
    ログイン --> [*] : 利用終了
    管理トップ --> [*] : 利用終了
    @enduml
    ```
    - 教科管理時
    ``` plantuml
    @startuml
    [*] --> 管理トップ
    管理トップ --> 教科管理 : 教科ボタン押下
    教科管理 --> 教科追加 : 追加ボタン押下
    教科追加 --> 教科管理 : 追加ボタン押下
    教科追加 --> 教科管理 : キャンセルボタン押下
    教科管理 --> 教科変更 : 変更ボタン押下
    教科変更 --> 教科管理 : 変更ボタン押下
    教科変更 --> 教科管理 : キャンセルボタン押下
    教科管理 --> 教科削除確認 : 削除ボタン押下
    教科削除確認 --> 教科管理 : 削除ボタン押下
    教科削除確認 --> 教科管理 : キャンセルボタン押下
    @enduml
    ```
    - 問題管理
    ``` plantuml
    @startuml
    [*] --> 管理トップ
    管理トップ --> 問題管理 : 教科ボタン押下
    問題管理 --> 問題管理 : 教科選択
    問題管理 --> 問題追加 : 追加ボタン押下
    問題追加 --> 問題追加 : 追加ボタン押下 失敗
    問題追加 --> 問題管理 : 追加ボタン押下 成功
    問題追加 --> 問題管理 : キャンセルボタン押下
    問題管理 --> 問題削除 : 削除ボタン押下
    問題削除 --> 問題管理 : 削除ボタン押下
    問題削除 --> 問題管理 : キャンセルボタン押下
    問題管理 --> 問題編集 : 編集ボタン押下
    問題編集 --> 問題編集 : 保存ボタン押下 失敗
    問題編集 --> 問題管理 : 保存ボタン押下 成功
    問題編集 --> 問題管理 : キャンセルボタン押下
    @enduml
    ```
