export const options = {
  vus: 2,
  duration: '5s',
};

console.log(' -- init stage -- ');

export function setup() {
  console.log(' -- setup stage -- ');
}

export function setup() {
  console.log(' -- VU stage -- ');
}

export function teardown() {
  console.log(' -- Teardown stage -- ');
}
