import React, { useRef, useEffect } from "react";

const WebcamFeed = ({ videoRef }) => {
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      });
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      width="400"
      height="300"
      style={{ borderRadius: "10px" }}
    />
  );
};

export default WebcamFeed;
