import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>edit</h1>
    </div>
  );
};

export default Edit;
