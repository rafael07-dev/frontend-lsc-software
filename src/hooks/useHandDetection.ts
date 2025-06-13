import { useEffect, useRef } from "react";
import { Hands, Results } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";

export function useHandDetection(onResults: (results: Results) => void) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraRef = useRef<cam.Camera | null>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && videoRef.current) {
      const hands = new Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      // En useHandDetection.js, modifica los parámetros
      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,  // Reducido de 0.7
        minTrackingConfidence: 0.5,   // Reducido de 0.7
      });

      hands.onResults(onResults);

      cameraRef.current = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current?.readyState === 4) {
            try {
              await hands.send({ image: videoRef.current });
            } catch (error) {
              console.error("Error sending frame to model:", error);
            }
          }
        },
        width: 1280,
        height: 720,
      });

      cameraRef.current.start();
      hasInitialized.current = true;

      return () => {
        cameraRef.current?.stop();
        hands.close();
      };
    }
  }, [onResults]);

  return { videoRef };
}
