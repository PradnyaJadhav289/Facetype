import { useEffect, useRef } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

const FaceDetector = ({ videoRef, onExpression }) => {
  const lastTriggerRef = useRef(0);

  useEffect(() => {
    if (!videoRef.current) return;

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    faceMesh.onResults((results) => {
      if (!results.multiFaceLandmarks?.length) return;

      const landmarks = results.multiFaceLandmarks[0];
      const now = Date.now();
      const cooldown = 600; // milliseconds

      if (now - lastTriggerRef.current < cooldown) return;

      // ===== HEAD MOVEMENT =====
      const nose = landmarks[1];
const center = 0.5;
const movement = nose.x - center;

// move right
if (movement > 0.20 && now - lastTriggerRef.current > cooldown) {
  onExpression("NEXT");
  lastTriggerRef.current = now;
  return;
}
// move left
if (movement < -0.10) {
  onExpression("PREVIOUS");
  lastTriggerRef.current = now;
  return;
}

      // ===== MOUTH OPEN =====
      const upperLip = landmarks[13];
      const lowerLip = landmarks[14];
      const mouthDistance = Math.abs(upperLip.y - lowerLip.y);

      if (mouthDistance > 0.05) {
        onExpression("SPACE");
        lastTriggerRef.current = now;
        return;
      }

      // ===== BLINK =====
      const leftEyeTop = landmarks[159];
      const leftEyeBottom = landmarks[145];
      const rightEyeTop = landmarks[386];
      const rightEyeBottom = landmarks[374];

      const leftEyeDistance = Math.abs(leftEyeTop.y - leftEyeBottom.y);
      const rightEyeDistance = Math.abs(rightEyeTop.y - rightEyeBottom.y);

      const blinkThreshold = 0.012;

      if (
        leftEyeDistance < blinkThreshold &&
        rightEyeDistance < blinkThreshold
      ) {
        onExpression("BLINK");
        lastTriggerRef.current = now;
        return;
      }

      // ===== SMILE =====
      const leftCorner = landmarks[61];
      const rightCorner = landmarks[291];
      const smileWidth = Math.abs(leftCorner.x - rightCorner.x);

      if (smileWidth > 0.45) {
        onExpression("DELETE");
        lastTriggerRef.current = now;
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current.readyState === 4) {
          await faceMesh.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480
    });

    camera.start();

    return () => {
      camera.stop();
      faceMesh.close();
    };
  }, []);

  return null;
};

export default FaceDetector;
