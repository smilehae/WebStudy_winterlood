import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, content, date, emotion }) => {
  const navigate = useNavigate();
  const dateText = new Date(date).toLocaleDateString();
  return (
    <div className="DiaryItem">
      <div className={["image_wrapper", `image_wrapper${emotion}`].join(" ")}>
        <img src={process.env.PUBLIC_URL + `assets/emotion_${emotion}.png`} />
      </div>
      <div className="content_container">
        <div className="date_text">{dateText}</div>
        <div className="content_text">{content}</div>
      </div>
      <div className="btn_container">
        <MyButton text={"수정하기"} onClick={() => navigate(`/edit/${id}`)} />
      </div>
    </div>
  );
};

export default DiaryItem;
