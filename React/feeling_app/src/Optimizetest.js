import React, { useState, useEffect } from "react";

//CounterA를 눌러도 업데이트가 되지 않는다. 값이 1에서 1로 똑같기 때문.
const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log("counter A update");
  });
  return <div>{count}</div>;
});
//counterB 누르면업데이트 된다. props가 객체이기 때문! : 얕은비교(주소에 의한 비교)
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log("counter B update");
  });

  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.obj.count === nextProps.obj.count;
};

//areEqual 따라 반환여부, 리렌더 여부 판단!
const MemoizedCounterB = React.memo(CounterB, areEqual);

const Optimizetest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={(e) => setCount(count)}>A Button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button onClick={(e) => setObj({ count: obj.count })}>B Button</button>
      </div>
    </div>
  );
};

export default Optimizetest;
