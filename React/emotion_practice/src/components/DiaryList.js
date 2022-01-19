import { useState } from "react";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";

const ControlMenu = ({ sortOptions, value, onChange }) => {
  return (
    <select value={value} onChange={onChange} className="ControlMenu">
      {sortOptions.map((option, idx) => (
        <option value={option.value} key={idx}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

const sortOptions = [
  { name: "최신순", value: "latest" },
  { name: "오래된 순", value: "oldest" },
];

const feelingOptions = [
  { name: "전부 다", value: "all" },
  { name: "좋은 감정만", value: "good" },
  { name: "안좋은 감정만", value: "bad" },
];

const DiaryList = ({ data }) => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("latest");
  const [feelingFilter, setFeelingFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const sortByDate = (a, b) => {
      if (sortOrder === "oldest") {
        return a.date - b.date;
      } else {
        return b.date - a.date;
      }
    };
    const copyList = JSON.parse(JSON.stringify(data));
    const sortedList = copyList.sort(sortByDate);
    if (feelingFilter === "all") return sortedList;
    if (feelingFilter === "good")
      return sortedList.filter((data) => data.emotion >= 3);
    if (feelingFilter === "bad")
      return sortedList.filter((data) => data.emotion < 3);
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="control_container">
          <ControlMenu
            sortOptions={sortOptions}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
          <ControlMenu
            sortOptions={feelingOptions}
            value={feelingFilter}
            onChange={(e) => setFeelingFilter(e.target.value)}
          />
        </div>
        <div className="btn_container">
          <MyButton
            text={"새 일기쓰기"}
            type={"positive"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      <div className="dataList">
        {getProcessedDiaryList().map((data) => (
          <DiaryItem key={data.id} {...data} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
