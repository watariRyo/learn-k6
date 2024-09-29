## Tag

- システムタグ
  k6 が自動的に割り当てるタグ  
  現在、k6 はデフォルトで以下のタグを自動的に作成
  - proto 使用されたプロトコルの名前（例：HTTP/1.1）
  - subproto WebSocket で使用されるサブプロトコルの名前
  - status HTTP ステータスコード（例：200、404 など）
  - method HTTP メソッド名（例：GET、POST など）または gRPC の RPC メソッド名
  - url HTTP リクエストの URL
  - name HTTP リクエストの名前
  - group 詳細については前述の説明を参照してくださいが、フルグループパス
  - check Check の名前
  - error 非 HTTP エラーメッセージを含む文字列（例：ネットワークエラーや DNS エラー）
  - error_code エラータイプを指定する番号；現在のエラーコードのリストはエラーコードページで確認できます
  - tls_version TLS バージョン
  - scenario メトリックが発行されたシナリオの名前
  - service gRPC の RPC サービス名
  - expected_response responseCallback に基づいて true または false（デフォルトではステータスが 2xx または 3xx であるかどうかをチェック）
- ユーザー定義のタグ
  スクリプトを作成する際に追加するタグ  
  テストのロジックに基づいて、k6 エンティティをカテゴライズするために独自のタグを定義
  - 例えば以下のエンティティにタグを付ける
    - リクエスト
    - チェック
    - 閾値
    - カスタムメトリクス
