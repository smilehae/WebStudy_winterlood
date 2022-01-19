import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryDataContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();
  const [originData, setOriginData] = useState();
  const diaryList = React.useContext(DiaryDataContext);
  const { id } = useParams();

  useEffect(() => {
    if (diaryList.length > 1) {
      const targetDiary = diaryList.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div className="Edit">
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
