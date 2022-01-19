import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { useContext, useEffect, useRef, useState } from "react";
import EmotionItem from "./EmotionItem";
import { DiaryDispatcherContext } from "../App";

const getISODate = (date) => {
  return date.toISOString().slice(0, 10);
};

const emotions = [
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion_5.png",
    emotion_desc: "완전 좋음",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion_4.png",
    emotion_desc: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion_3.png",
    emotion_desc: "그럭저럭",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion_2.png",
    emotion_desc: "나쁨",
  },
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion_1.png",
    emotion_desc: "끔찍함",
  },
];

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getISODate(new Date()));
  const [selectedEmotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");
  const textRef = useRef();

  const { onCreate, onEdit } = useContext(DiaryDispatcherContext);

  const handleSubmit = () => {
    if (content.length < 1) {
      textRef.current.focus();
      return;
    }
    if (isEdit) {
      onEdit({ id: originData.id, content, emotion: selectedEmotion, date });
    } else {
      onCreate({ content, emotion: selectedEmotion, date });
    }
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getISODate(new Date(originData.date)));
      setContent(originData.content);
      setEmotion(originData.emotion);
    }
  }, [originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headerText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div className="section_wrapper">
        <section>
          <h4>오늘은 언제인가요?</h4>
          <input
            type="date"
            value={date}
            className="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="emotion_container">
            {emotions.map((emotion) => (
              <div
                key={emotion.emotion_id}
                onClick={() => {
                  setEmotion(emotion.emotion_id);
                }}
              >
                <EmotionItem
                  {...emotion}
                  isSelected={emotion.emotion_id === selectedEmotion}
                />
              </div>
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <textarea
            placeholder="오늘은 어땠나요?"
            ref={textRef}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </section>
        <section>
          <div className="btn_container">
            <MyButton
              text={"취소하기"}
              onClick={() => {
                navigate(-1);
              }}
            />
            <MyButton
              text={isEdit ? "수정완료" : "작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
