import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Lifecycle from "./Lifecycle";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);
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
      const newDiaryList = data.filter((item) => item.id != targetId);
      setData(newDiaryList);
    }
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : { item }
      )
    );
  };

  return (
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
