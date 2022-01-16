import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

//상태변화 직전 state, 어떤 상태변화를 일으켜야 하는지 정보 action
//return 값이 새로운 state가 된다.
const reducer = (state, action) => {
  switch (action.type) {
    case `INIT`: {
      return action.data;
    }
    case `CREATE`: {
      const created_time = new Date().getTime();
      const newItem = {
        ...action.data,
        created_time,
      };
      return [newItem, ...state];
    }
    case `REMOVE`: {
      return state.filter((data) => data.id !== action.targetId);
    }
    case `EDIT`: {
      return state.map((item) =>
        item.id === action.targetId
          ? { ...item, content: action.newContent }
          : item
      );
    }
    default:
      return state;
  }
};

//export default는 파일당 하나만 가능.
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    const initData = res.slice(0, 20).map((item) => {
      const created_time = new Date().getTime();
      const obj = {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_time,
        id: dataId.current++,
      };
      return obj;
    });

    //직접해보기
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  // 한번 mount 될때만 실행. 그 뒤에는 같은 값을 유지한다.
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    // const created_time = new Date().getTime();
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   created_time,
    //   id: dataId.current,
    // };
    dataId.current += 1;
    //setState에 함수를 전달하는게 함수형 업데이트 라고 함.
    //이렇게 안하면, 데이터의 현재값을 참조하는 것이 불가능함.
    // setData((data) => [newItem, ...data]);
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
    // if (window.confirm(`해당 일기를 정말 삭제하시겠습니까?`)) {
    //   setData((data) => data.filter((item) => item.id !== targetId));
    // }
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
    // setData((data) =>
    //   data.map((item) =>
    //     item.id === targetId ? { ...item, content: newContent } : { ...item }
    //   )
    // );
  }, []);

  //재생성 되지 않게!
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);
  //useMemo로 memoization원하는거 감싸기, 배열 주기
  //length가 바뀔때만 실행
  //이때는 특정 값을 반환한다고 함! getDiaryAnalysis가 함수가 아님.
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((item) => item.emotion > 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
