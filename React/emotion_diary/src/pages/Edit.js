import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const obj = {};
  obj.id = searchParams.get("id");
  obj.mode = searchParams.get("mode");
  console.log(`mode : ${obj.mode}`);
  console.log(`id : ${obj.id}`);
  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 수정 페이지입니다.</p>
      <button
        onClick={() => {
          setSearchParams({ ...obj, who: "mihae" });
        }}
      >
        Query searching 바꾸기
      </button>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        수정 완료
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
