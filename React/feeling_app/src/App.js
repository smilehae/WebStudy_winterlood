import { useRef, useState, useMemo } from "react";
import { useEffect } from "react/cjs/react.development";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]);

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
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_time = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_time,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    if (window.confirm(`해당 일기를 정말 삭제하시겠습니까?`)) {
      const newDiaryList = data.filter((item) => item.id !== targetId);
      setData(newDiaryList);
    }
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : { ...item }
      )
    );
  };
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
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
