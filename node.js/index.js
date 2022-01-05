//node.js의 내장함수
const calc = require("./calc");

console.log(calc.add(1, 2));
console.log(calc.sub(10, 2));

//기능별로 파일을 구분하고 불러와서 사용할 수 있음!
//CommonJs라는 모듈 시스템을 사용하는 것!
