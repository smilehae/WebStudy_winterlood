const add = (a, b) => a + b;
const sub = (a, b) => a - b;

//node.js의 내장함수
module.exports = {
  moduleName: "calc module",
  add: add,
  sub: sub,
};
