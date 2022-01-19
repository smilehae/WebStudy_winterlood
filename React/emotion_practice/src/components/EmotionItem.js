const EmotionItem = ({ emotion_id, emotion_img, emotion_desc, isSelected }) => {
  return (
    <div
      key={emotion_id}
      className={[
        "EmotionItem",
        isSelected ? `emotion_selected${emotion_id}` : "",
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_desc}</span>
    </div>
  );
};

export default EmotionItem;
