import "./App.css";
import React from "react";

import Header from "./Myheader";
import Footer from "./Myfooter";

function App() {
  let name = "미해";

  const style = {
    App: {
      backgroundColor: "pink",
    },
    h2: {
      color: "blue",
    },
  };

  const func = () => {
    return "func";
  };

  const number = 5;

  return (
    <div style={style.App} className="App">
      <Header />
      <div className="App-header">
        <h2 style={style.h2}>
          Hello, {name} {1 * 3} {func()}
          {number}는 : {number % 2 == 0 ? "짝수" : "홀수"}
        </h2>
      </div>
      <Footer />
    </div>
  );
}

export default App;
