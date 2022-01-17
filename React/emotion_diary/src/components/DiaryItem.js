import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();
  const dateText = new Date(date).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  return (
    <div className="DiaryItem">
      <div
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          onClick={goDetail}
        />
      </div>
      <div className="content_container" onClick={goDetail}>
        <div className="date">{dateText}</div>
        <div className="content">{content}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton text="수정하기" onClick={() => navigate(`/edit/${id}`)} />
      </div>
    </div>
  );
};

export default DiaryItem;
