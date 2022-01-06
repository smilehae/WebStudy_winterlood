import "./App.css";
import React from "react";

import Counter from "./Counter";
import Container from "./Container";

function App() {
  const counterProps = {
    a: 1,
    b: 2,
    initialValue: 5,
  };

  return (
    <Container>
      <Counter {...counterProps} />
    </Container>
  );
}

export default App;
