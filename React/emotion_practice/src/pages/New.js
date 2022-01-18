import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const New = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MyHeader
        headerText={"새로운 일기 쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
    </div>
  );
};

export default New;
