import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import Myheader from "./../components/MyHeader";
import Mybutton from "./../components/MyButton";
import DiaryList from "./../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length >= 1) {
      //특정 년도, 월의 1일에 대한 milli sec
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      //월의 마지막날 - 다음 월 + 일에 0일을 넣어주면 된다!
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();
      setData(
        diaryList.filter(
          (item) => item.date >= firstDay && item.date <= lastDay
        )
      );
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
      <Myheader
        headText={headText}
        leftChild={<Mybutton text={" < "} onClick={decreaseMonth} />}
        rightChild={<Mybutton text={" > "} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
