function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

//async
// async를 붙이면 자동으로 Promise를 반환하는 비동기 함수가 된다.
// async를 붙인 값의 return 값은 resolve의 결과값이 된다.
async function helloAsync() {
  //   return delay(5000).then(() => {
  //     return "hello Async";
  //   });

  //비동기 함수 앞에 await를 붙이면 동기적으로 수행. delay(3000);을 한 다음에 다음 줄이 시작됨.
  await delay(3000);
  return "hello Async";
}

// helloAsync().then((res) => {
//   console.log(res);
// });

async function main() {
  const res = await helloAsync();
  console.log(res);
}

main();
