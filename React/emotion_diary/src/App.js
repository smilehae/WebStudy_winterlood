import React, { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";
import RouteTest from "./components/RouteTest";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case `INIT`: {
      return action.data;
    }
    case `CREATE`: {
      newState = [action.data, ...state];
      break;
    }
    case `REMOVE`: {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    }
    case `EDIT`: {
      newState = state.map((item) =>
        item.id === action.data.id ? { ...action.data } : item
      );
      break;
    }
    default: {
      return state;
    }
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

//dummy data
const dummyData = [
  { id: 1, emotion: 1, content: "오늘의일기 1번", date: 1642348587388 },
  { id: 2, emotion: 2, content: "오늘의일기 2번", date: 1642348587386 },

  { id: 3, emotion: 3, content: "오늘의일기 3번", date: 1642348587387 },

  { id: 4, emotion: 4, content: "오늘의일기 4번", date: 1642348587389 },

  { id: 5, emotion: 5, content: "오늘의일기 5번", date: 1642348587380 },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(6);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
  };

  //EDIT
  const onEdit = (id, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
