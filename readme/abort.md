## abort

エラー時にテストを実行前や途中に落とす  
catch〜throw みたいなもの

```js
import { sleep } from 'k6';
import execution from 'k6/execution';
import http from 'k6/http';

export const options = {
  vus: 2,
  duration: '5s',
};

export function setup() {
  let res = http.get('https://test.k6.local/status');
  if (res.error) {
    execution.test.abort('Aborting test. Application is down');
  }
}

export default function () {
  http.get('https://test.k6.local/some-page');
  sleep(1);
}
```
