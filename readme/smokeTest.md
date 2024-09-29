## Smoke Test

- 定義
  ソースコードの開発・追加・修正を終えたソフトウェアが動作する状態にあるかを確認するテストのこと  
  本格的なソフトウェアテストが実施可能かを確認するための予備的な簡易テスト

サンプル

```js
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '30s',
};

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
  http.get('https://test.k6.io/contacts.php');
  sleep(2);
  http.get('https://test.k6.io/news.php');
  sleep(2);
}
```

機能確認のため並列（vus）は 1〜3 など少数で良い  
API を網羅したい

テストスクリプトが更新されるたびにこれは実施する  
エラーが起きたらスクリプトか環境を確認する
