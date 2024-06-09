import { check, sleep } from "k6";
import http from "k6/http";

export const options = {
  vus: 10,
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(95)<400"],
    http_req_duration: ["max<1000"],
    http_req_failed: ["rate<0.01"],
    http_reqs: ["count>20"],
    http_reqs: ["rate>4"],
    vus: ["value>9"],
    checks: ["rate>=0.99"],
  },
};

export default function () {
  const res = http.get("https://test.k6.io");
  // console.log(exec.scenario.iterationInTest);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "page is startpage": (r) =>
      r.body.includes(
        "Collection of simple web-pages suitable for load testing."
      ),
  });
  sleep(2);
}
