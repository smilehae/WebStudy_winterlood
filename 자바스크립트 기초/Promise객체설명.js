function isPositive(number, resolve, reject) {
  setTimeout(() => {
    if (typeof number === "number") {
      // 성공 : resolve
      resolve(number > 0 ? "양수" : "음수");
    } else {
      // 실패 : reject
      reject("주어진 값이 숫자가 아닙니다.");
    }
  }, 2000);
}
// 비동기 작업을 하고 Promise 객체를 반환받아서 사용!
function isPositiveP(number) {
  // executor : 비동기 함수를 수행하는 함수.
  const executor = (resolve, reject) => {
    setTimeout(() => {
      if (typeof number === "number") {
        console.log(number);
        // 성공 : resolve
        resolve(number > 0 ? "양수" : "음수");
      } else {
        // 실패 : reject
        reject("주어진 값이 숫자가 아닙니다.");
      }
    }, 2000);
  };
  // Promise 객체 생성. 생성자로 executor을 전달하면 바로 수행된다고 한다.
  const asyncTask = new Promise(executor);
  return asyncTask;
}

const response = isPositiveP(101);

response
  .then((res) => {
    console.log("작업 성공 : ", res);
  })
  .catch((err) => {
    console.log("작업 실패 : ", err);
  });

// // res는 결과, err는 에러 원인
// isPositive(
//   10,
//   (res) => {
//     console.log("성공적으로 수행됨 : ", res);
//   },
//   (err) => {
//     console.log("실패함. ", err);
//   }
// );
