import { useState, useRef } from "react";

const DiaryItem = ({
  author,
  content,
  emotion,
  created_time,
  id,
  onRemove,
  onEdit,
}) => {
  const [isEdit, setEdit] = useState(false); //수정중인지 여부 확인

  const [localContent, setLocalContent] = useState(content);

  const contentInput = useRef();

  const toggleIsEdit = () => {
    setEdit(!isEdit);
  };

  const handleRemove = () => {
    onRemove(id);
  };

  const handleQuitEdit = () => {
    setLocalContent(content);
    toggleIsEdit();
  };

  const handleEdit = () => {
    if (localContent.length < 1) {
      contentInput.current.focus();
      return;
    }
    onEdit(id, localContent);
    toggleIsEdit();
  };

  return (
    <div className="DiaryItem" key={id}>
      <div className="info">
        <span>
          작성자 : {author} | 감정정보 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_time).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={contentInput}
              value={localContent}
              onChange={(e) => {
                setLocalContent(e.target.value);
              }}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
