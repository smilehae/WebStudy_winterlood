import React from "react";
//얘는 memo 사용해도 리렌더 -> onClick에서 받는게 state함수가 아니기 때문 > useCallback 적용
const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_description,
  onClick,
  isSelected,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "EmotionItem",
        isSelected ? `emotion_background${emotion_id}` : "emotion_off",
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_description}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
