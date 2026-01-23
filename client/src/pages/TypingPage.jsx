import React, { useRef, useState, useEffect } from "react";
import WebcamFeed from "../components/WebcamFeed";
import FaceDetector from "../components/FaceDetector";
import VirtualKeyboard from "../components/VirtualKeyboard";
import TypedOutput from "../components/TypedOutput";
import { saveSession } from "../services/api";

const TypingPage = () => {
  const videoRef = useRef(null);
  const [text, setText] = useState("");
  const [logs, setLogs] = useState([]);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lastExpression, setLastExpression] = useState("None");

  const handleExpression = (expression) => {
    setLastExpression(expression);

    if (expression === "NEXT") {
      setSelectedIndex(prev =>
        prev === letters.length - 1 ? 0 : prev + 1
      );
    }

    else if (expression === "PREVIOUS") {
      setSelectedIndex(prev =>
        prev === 0 ? letters.length - 1 : prev - 1
      );
    }

    else if (expression === "BLINK") {
      setSelectedIndex(currentIndex => {
        setText(prevText => prevText + letters[currentIndex]);
        return currentIndex;
      });
    }

    else if (expression === "SPACE") {
      setText(prev => prev + " ");
    }

    else if (expression === "DELETE") {
      setText(prev => prev.slice(0, -1));
    }

    setLogs(prev => [
      ...prev,
      { expression, timestamp: new Date() }
    ]);
  };

  const handleSave = async () => {
    await saveSession({
      userId: "dummy_user_id",
      typedText: text,
      expressionLogs: logs,
      duration: 60
    });
    alert("Session Saved");
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <div style={styles.container}>
        <h1 style={styles.title}>FaceType AI</h1>

        <p style={styles.status}>
          Current Expression: <span style={styles.highlight}>{lastExpression}</span>
        </p>

        <div style={styles.section}>
          <WebcamFeed videoRef={videoRef} />
          <FaceDetector videoRef={videoRef} onExpression={handleExpression} />
        </div>

        <h3 style={styles.selected}>
          Selected Letter: <span style={styles.highlight}>{letters[selectedIndex]}</span>
        </h3>

        <VirtualKeyboard
          letters={letters}
          selectedIndex={selectedIndex}
        />

        <TypedOutput text={text} />

        <button
          style={styles.saveButton}
          onClick={handleSave}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "none";
          }}
        >
          Save Session
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(-45deg, #1e3c72, #2a5298, #0f2027, #203a43)",
    backgroundSize: "400% 400%",
    animation: "gradientShift 10s ease infinite",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Segoe UI, sans-serif"
  },

  glow1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "50%",
    filter: "blur(120px)",
    top: "10%",
    left: "15%"
  },

  glow2: {
    position: "absolute",
    width: "250px",
    height: "250px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    filter: "blur(100px)",
    bottom: "15%",
    right: "15%"
  },

  container: {
    position: "relative",
    zIndex: 2,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(15px)",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    width: "100%",
    maxWidth: "900px",
    color: "white",
    boxShadow: "0 15px 40px rgba(0,0,0,0.5)"
  },

  title: {
    fontSize: "32px",
    marginBottom: "10px",
    letterSpacing: "1px"
  },

  status: {
    marginBottom: "20px",
    fontSize: "16px",
    opacity: 0.9
  },

  highlight: {
    color: "#ffd700",
    fontWeight: "bold"
  },

  selected: {
    margin: "20px 0",
    fontSize: "18px"
  },

  section: {
    marginBottom: "20px"
  },

  saveButton: {
    marginTop: "25px",
    padding: "12px 35px",
    fontSize: "16px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(90deg, #ffffff, #f1f1f1)",
    color: "#2a5298",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease"
  }
};

export default TypingPage;
