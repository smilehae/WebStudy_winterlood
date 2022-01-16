import { useParams } from "react-router-dom"; //custom hook.

const Diary = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 다이어리 보기 페이지입니다.</p>
    </div>
  );
};

export default Diary;
