import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";
import React, { useReducer, useRef } from "react";

export const DiaryDataContext = React.createContext();
export const DiaryDispatcherContext = React.createContext();

const dummyData = [
  { id: 1, content: "첫번째 일기", emotion: 1, date: 1642493400210 },
  { id: 2, content: "두번째 일기", emotion: 2, date: 1642493400215 },
  { id: 3, content: "세번째 일기", emotion: 3, date: 1642493400213 },
  { id: 4, content: "네번째 일기", emotion: 4, date: 1642493400214 },
  { id: 5, content: "다섯번째 일기", emotion: 5, date: 1642493400219 },
];

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case `INIT`: {
      return action.data;
    }
    case `CREATE`: {
      console.log(action.data);
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
    case `DEFAULT`: {
      return state;
    }
  }
  return newState;
};

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const idCount = useRef(6);

  const onCreate = ({ content, emotion, date }) => {
    console.log({ content, emotion, date }, "onCreate");
    dispatch({
      type: "CREATE",
      data: {
        id: idCount.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    idCount.current += 1;
  };

  const onRemove = ({ targetId }) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = ({ id, content, emotion, date }) => {
    dispatch({
      type: `EDIT`,
      data: {
        id,
        content,
        emotion,
        date: new Date(date).getTime(),
      },
    });
  };
  return (
    <div className="App">
      <DiaryDataContext.Provider value={data}>
        <DiaryDispatcherContext.Provider value={{ onCreate, onEdit, onRemove }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary" element={<Diary />} />
            </Routes>
          </BrowserRouter>
        </DiaryDispatcherContext.Provider>
      </DiaryDataContext.Provider>
    </div>
  );
}

export default App;
