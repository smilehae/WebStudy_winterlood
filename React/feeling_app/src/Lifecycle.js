import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unMounted");
    }; //Unmount시점에 실행
  }, []);
  return <div>Unmount Test component</div>;
};

const Lifecycle = () => {
  const [isVisible, setVisible] = useState(false);
  const toggle = () => setVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default Lifecycle;
