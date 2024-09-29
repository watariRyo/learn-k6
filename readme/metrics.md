## メトリクス

- checks
  - チェック関数の成功割合
- http_req_duration
  - HTTP リクエストの完了にかかった合計時間
- http_req_failed
  - 失敗した HTTP リクエストの割合
- iteration_duration
  - 1 回のイテレーションを完了するのにかかった時間
- vus
  - アクティブな仮想ユーザー(VU)の数
- vus_max
  - 最大 VU 数
- http_reqs
  - テスト中に生成された HTTP リクエストの総数
- http_req_blocked
  - リクエスト開始前にブロックされている時間
- http_req_connecting
  - TCP 接続の確立にかかった時間
- カスタムメトリクス
  - カスタムと言いつつ K6 の恩恵に預かる  
    他に trend など

```js
import { check, sleep } from 'k6';
import http from 'k6/http';
import { Counter } from 'k6/metrics';

export const options = {
  vus: 5,
  duration: '5s',
  thresholds: {
    http_req_duration: ['p(95)<400'],
    my_counter: ['count>10'], // 宣言したメトリクスの閾値設定
  },
};

let myCounter = new Counter('my_counter'); // custom_metrics宣言

export default function () {
  const res = http.get('https://test.k6.io');
  myCounter.add(1); // メトリクスの操作
  sleep(2);
}
```
