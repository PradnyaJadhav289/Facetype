import React from "react";

const TypedOutput = ({ text }) => {
  return (
    <textarea
      value={text}
      readOnly
      rows={5}
      cols={50}
      style={{ marginTop: "20px", fontSize: "18px" }}
    />
  );
};

export default TypedOutput;
