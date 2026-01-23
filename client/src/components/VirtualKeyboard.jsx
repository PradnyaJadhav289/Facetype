import React from "react";

const keys = ["A", "B", "C", "D", "E", "F", "G"];

const VirtualKeyboard = ({ letters, selectedIndex }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {letters.map((key, index) => (
        <button
          key={key}
          style={{
            margin: "5px",
            padding: "10px 15px",
            fontSize: "18px",
            backgroundColor: index === selectedIndex ? "yellow" : "white"
          }}
        >
          {key}
        </button>
      ))}
    </div>
  );
};


export default VirtualKeyboard;
