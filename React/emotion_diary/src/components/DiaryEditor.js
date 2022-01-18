import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_description: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_description: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_description: "그냥저냥",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_description: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_description: "끔찍함",
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const navigate = useNavigate();
  const textareaInput = useRef();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [text, setText] = useState("");

  const { onCreate } = useContext(DiaryDispatchContext);

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (text.length < 1) {
      textareaInput.current.focus();
      return;
    }
    onCreate(date, text, emotion);
    //뒤로가기 통해 현재 페이지로 못돌아옴!
    navigate("/", { replace: true });
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={<MyButton text="< 뒤로가기" onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정은?</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((item) => (
              <EmotionItem
                {...item}
                key={item.id}
                onClick={handleClickEmote}
                isSelected={item.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box textarea_wrapper">
            <textarea
              placeholder="오늘은 어떘나요?"
              onChange={(e) => setText(e.target.value)}
              ref={textareaInput}
              value={text}
            />
          </div>
        </section>
        <section>
          <div className="btn_container">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type="positive"
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
