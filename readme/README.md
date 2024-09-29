## k6 基本

公式：https://k6.io/

k6 の基本的な部分はここに記載する  
それ以外は相対パスの md 参照

- 性能テスト色々
  - [スモークテスト](./smokeTest.md)
  - 負荷テスト
    システムに同時に多数のアクセスが発生するなどの理由で、負荷がかかった状態でのシステムの挙動を確認するテスト
    - [ロードテスト](./loadTest.md)
    - [ストレステスト](./stressTest.md)
    - スパイクテスト（Spike Test）
      トラフィック負荷を極端に増減させてソフトウェア アプリケーションをテストする  
      ユーザー負荷の突然の増加または減少下でのソフトウェア アプリケーションの動作を評価し、ユーザー負荷のスパイク後の回復時間を決定する
    - ブレークポイントテスト（BreakPoint Test）
      負荷を徐々に増加させて、システムがどこで限界を迎えるかを特定するために使用  
      問題が起きたら手動で止める  
      テストの期間は無制限で停止にも手が介入する  
      パフォーマンスのベースラインを図るために、LoadTest と StressTest に合格している前提が必要
    - 耐久性テスト（Soak Test）
      実稼働しているシステムの動作検証のために、継続的な利用可能期間にわたり、通常の実稼働負荷でシステムをテストすること  
      時間の設定として 24 時間やそれ以上もありうる  
      負荷については LoadTest と同じ設定で行う

### 重要なオプション一例

- vus
  - どれだけ並列で実行するか
- duration
  - テスト時間
- iteration
  - シナリオを繰り返す回数

### シンプルな記載例

```js
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

import http from "k6/http";
import { sleep } from "k6";

export const options = {
 vus: 10,
 duration: "5s",
};

export default function () {
 http.get("https://test.k6.io");
 sleep(1);
}
```

段階的に負荷を変えるのは以下のようになる  
vue ではないので留意

```js
import http from 'k6/http';

export let options = {
  stages: [
    { target: 10, duration: '1s' },
    { target: 20, duration: '1s' },
    { target: 30, duration: '1s' },
  ],
};

export default function () {
  http.get('http://localhost:8080/');
}
```

POST, PUT, DELETE などにも対応している

```js
http.post('http://localhost:8080/', JSON.stringify(body), headers);
http.put('http://localhost:8080/', JSON.stringify(body), headers);
http.del('http://localhost:8080/hoge/1');
```

### シナリオをテストする

- Assertions
  `import { check } from "k6";`
  Boolean での検証

```js
// 第１引数が検査値、第二引数が検証する式（複数指定可能）
check(true, {
  'true is true': (value) => value === true,
});
```

サンプル

```js
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'page is startpage': (r) =>
      r.body.includes(
        'Collection of simple web-pages suitable for load testing.'
      ),
  });
}
```

- Thresholds  
  各メトリクスの要求。オプションに定義する  
  これらを満たさない場合、テストは失敗する

```js
export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<100'],
    http_req_failed: ['rate<0.01'],
    checks: [rate >= 0.99],
  },
};
```

### メトリクス

実行後に出る結果たちの用語説明

[メトリクス用語集](./metrics.md)

### タグ

k6 エンティティをカテゴライズし、テスト結果をフィルタリングする

[tag](./tag.md)

### グループ

関数ごとで負荷スクリプトを整理するもの  
個人的にはシナリオをそれぞれ定義する方が好き

[groups](./groups.md)

### ライフサイクル

スクリプトの実行順を制御する

[lifecycle](./lifecycle.md)

### abort

サーバがなんらか応答しない時などテスト実行前に落としてしまう方法

[abort](./abort.md)
