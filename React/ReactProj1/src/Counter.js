import React, { useState } from "react";
import OddEvenResult from "./OddEvenResult";

const Counter = ({ initialValue }) => {
  const [count, setCount] = useState(initialValue);

  const onIncrease = () => {
    setCount(count + 1);
  };

  const onDecrease = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
      <OddEvenResult count={count} />
    </div>
  );
};

//전달받지 못한 Props의 기본값 설정 : 에러 방지
Counter.defaultProps = {
  initialValue: 0,
};

export default Counter;
