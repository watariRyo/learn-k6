import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const credentials = JSON.stringify({
    username: 'test_' + Date.now(),
    password: 'test_' + Date.now(),
  });

  const params = {
    header: {
      'Content-Type': 'application/json',
    },
  };

  http.post('https://test-api.k6.io/user/register/', credentials, params);

  let res = http.post(
    'https://test-api.k6.io/auth/token/login/',
    JSON.stringify(
      { username: credentials.username, password: credentials.password },
      params
    )
  );

  const accessToken = res.json().access;
  console.log(res.json());
}
