## Lifecycle

k6 には、次の 4 つのライフサイクルステージが存在する

- init
  最初に実行される、テスト全体で使う定数の宣言など
- setup
  スクリプト実行前に一度だけ実行される。例えばログイン処理や外部データ取込など前処理をする。ここで return した値は VU Code で受け取れる
- VU Code（VU stage）
  テスト本体。setup で return した値を受け取れる
- teardown
  処理の終わりに一度だけ実行するステージ。リソースのクリーンアップなど行う

```js
export const options = {
 vus: 2,
 duration: '5s',
};

console.log(' -- init stage -- ');

export function setup() {
 console.log(' -- setup stage -- ');
}

export function () {
 console.log(' -- VU stage -- ');
}

export function teardown() {
 console.log(' -- Teardown stage -- ');
}
```
