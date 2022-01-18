const MyHeader = ({ leftChild, headerText, rightChild }) => {
  return (
    <div className="MyHeader">
      <div className="left_child">{leftChild}</div>
      <div className="header_text">{headerText}</div>
      <div className="right_child">{rightChild}</div>
    </div>
  );
};

export default MyHeader;
