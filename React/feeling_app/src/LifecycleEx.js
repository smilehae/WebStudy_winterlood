import React, { useEffect, useState } from "react";

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  //UseEffect로 감지하고 싶은 것만 감지 가능!
  //useEffect에 빈배열을 넣으면, mount시점에만 작동
  useEffect(() => {
    console.log("mounted");
  }, []);

  //useEffect에 아무것도 넣지 않으면, 컴포넌트 업데이트시 작동
  useEffect(() => {
    console.log("updated");
  });

  //useEffect에 배열에 값 넣어두면, 해당 내용 변경시만 작동
  useEffect(() => {
    console.log(`count is update : ${count}`);
    if (count > 5) {
      alert("count가 5가 넘었습니다. 1로 초기화합니다.");
      setCount(1);
    }
  }, [count]);

  useEffect(() => {
    console.log(`text is update : ${text}`);
  }, [text]);

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></input>
      </div>
    </div>
  );
};

export default Lifecycle;
