import React, { useState, useEffect } from "react";

//컴포넌트를 React.memo로 감싸면 고차 컴포넌트라서 더 향상된 컴포넌트 리턴.
//결과적으로 , text가 변할때만 랜더링 되게 바꾸어서,
//부모가 리렌더링 되기 때문에 불필요하게 렌더링되는 경우를 막을 수 있다.
const TextView = React.memo(({ text }) => {
  useEffect(() => {
    console.log(`update :: Text : ${text}`);
  });
  return <div>{text}</div>;
});

const Countview = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`update :: count : ${count}`);
  });
  return <div>{count}</div>;
});

const Optimizetest1 = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <div>
        <h2>count</h2>
        <Countview count={count} />
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
      <div>
        <h2>text</h2>
        <TextView text={text} />
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

export default Optimizetest1;
