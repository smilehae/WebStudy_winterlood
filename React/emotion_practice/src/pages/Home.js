import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { useContext, useEffect, useState } from "react";
import DiaryList from "../components/DiaryList";
import { DiaryDataContext } from "../App";

const Home = () => {
  const diaryList = useContext(DiaryDataContext);

  const [curDate, setCurDate] = useState(new Date());
  const [data, setData] = useState([]);
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length > 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();
      setData(
        diaryList.filter((item) => item.date >= firstDay && item.date < lastDay)
      );
    }
  }, [diaryList, curDate]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headerText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList data={data} />
    </div>
  );
};

export default Home;
