import { check, group, sleep } from 'k6';
import http from 'k6/http';

export const options = {
  thresholds: {
    http_req_duration: ['p(95)<400'],
    'group_duration{group:::Main page}': ['p(95)<200'],
    'group_duration{group:::News page}': ['p(95)<200'],
    'group_duration{group:::Main page::Assets}': ['p(95)<200'],
  },
};

export default function () {
  group('Main page', () => {
    let res = http.get('https://test.k6.io');
    check(res, { 'status is 200': (r) => r.status === 200 });

    group('Assets', () => {
      http.get('https://test.k6.io/static/css/site.css');
      http.get('https://test.k6.io/static/js/prisms.js');
    });
  });

  group('News page', () => {
    http.get('https://test.k6.io/news.php');
  });

  sleep(1);
}
