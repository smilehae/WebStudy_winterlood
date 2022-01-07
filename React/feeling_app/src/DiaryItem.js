const DiaryItem = ({ author, content, emotion, created_time, id }) => {
  return (
    <div className="DiaryItem" key={id}>
      <div className="info">
        <span>
          작성자 : {author} | 감정정보 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_time).toLocaleString()}</span>
      </div>
      <div className="content">{content}</div>
    </div>
  );
};

export default DiaryItem;
