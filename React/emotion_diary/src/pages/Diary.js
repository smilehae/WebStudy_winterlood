import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; //custom hook.
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/date";
import { emotions } from "../util/emotion";

const Diary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const diaryList = React.useContext(DiaryStateContext);
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  }, []);

  useEffect(() => {
    if (diaryList.length > 1) {
      const targetData = diaryList.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (targetData) {
        setData(targetData);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  //가장 처음엔 data가 들어있지 않고, 마운트 후 useEffect실행 이후에 데이터가 추가되게 된다.
  //따라서 그냥 data에 대한 마크업을 진행하게 되면 undefined.어쩌꼬 이렇게 접근이 되므로 방지하기 위해 사용!
  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const headText = `${getStringDate(new Date(data.date))} 기록`;
    const curEmotion = emotions.find(
      (emotion) => parseInt(emotion.emotion_id) === parseInt(data.emotion)
    );
    console.log(curEmotion);
    return (
      <div className="Diary">
        <MyHeader
          headText={headText}
          leftChild={
            <MyButton text="< 뒤로가기" onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton text="수정하기" onClick={() => navigate(`/edit/${id}`)} />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "emotion_wrapper",
                `emotion_background${curEmotion.emotion_id}`,
              ].join(" ")}
            >
              <img src={curEmotion.emotion_img} />
              <span>{curEmotion.emotion_description}</span>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="content_box">{data.content}</div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
