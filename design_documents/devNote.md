# ToDo
- [ ] 要件固め
- [ ] 画面遷移図作成
- [ ] XDで画面設計
- [ ] シーケンス図作成（データの動きを見たいため）
    - [ ] 教科管理、問題管理、ユーザー管理
- [ ] サーバ設計書の作成
- [ ] データベース設計書の作成

# アイディア
- [ ] すべての問題と教科には一意な文字列（以降IDと呼ぶ）が設定される。削除された物とも重複しない文字列とする。
    - [ ] 問題や教科を新しく登録するときに、その時点のタイムスタンプと教科IDを連結した文字列のハッシュ値を使えば実現できる。
- [ ] 問題はMDで作成する。
    -[ ] MDパーサ？のようなものを作る。
    - すでにあるっぽい
        - https://www.npmjs.com/package/markdown-json
        - https://www.npmjs.com/package/md-2-json
    - mdからjsonに変換、ajvで検証、json2formでフォーム作成、フォームの内容検証、回答用apiに送信、...

# 使い方とか
- quicktypeコマンド
    - そもそもjsonschemaからformを使いたくて入れてみた。何ならこれでformの管理とか設計が楽になりそう。
    - tsの型定義からjsonSchemaを作成してファイルに保存してくれる。
    ``` bash
    # 下のコマンドで作ってくれる
    quicktype <ts file> [-o <out json file name>] [--lang schema]
    # コピペ用
    quicktype .\form_schemas\ts\LoginForm.ts -o .\form_schemas\LoginForm.json --lang schema
    ```