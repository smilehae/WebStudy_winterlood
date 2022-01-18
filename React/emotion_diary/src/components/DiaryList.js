import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const emotionOption = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");
  const [emotionType, setEmotionType] = useState("all");
  const navigate = useNavigate();

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    //배열의 깊은 복사.
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const sortedList = copyList.sort(compare);
    let filteredList = sortedList;
    if (emotionType === "good") {
      filteredList = sortedList.filter((list) => parseInt(list.emotion) <= 3);
    } else if (emotionType === "bad") {
      filteredList = sortedList.filter((list) => parseInt(list.emotion) > 3);
    }
    return filteredList;
  };

  return (
    <div className="DiaryList">
      <div className="menu">
        <div className="left_col">
          <ControlMenu
            className="ControlMenu"
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            className="ControlMenu"
            value={emotionType}
            onChange={setEmotionType}
            optionList={emotionOption}
          />
        </div>
        <div className="right_col">
          <MyButton
            type="positive"
            text="새 일기쓰기"
            onClick={() => navigate("./new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
