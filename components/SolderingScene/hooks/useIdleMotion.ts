import { useRef } from "react";

export function useIdleMotion() {
  const flickerTimerRef = useRef(0);
  const flickerDurationRef = useRef(0);
  const isFlickeringRef = useRef(false);
  const nextFlickerTimeRef = useRef(15 + Math.random() * 5); // 15-20s

  const updateLampFlicker = (delta: number, elapsed: number) => {
    flickerTimerRef.current += delta;
    if (flickerTimerRef.current >= nextFlickerTimeRef.current) {
      isFlickeringRef.current = true;
      flickerTimerRef.current = 0;
      flickerDurationRef.current = 0.1 + Math.random() * 0.15; // 100-250ms
      nextFlickerTimeRef.current = 15 + Math.random() * 10;
    }

    if (isFlickeringRef.current) {
      flickerDurationRef.current -= delta;
      if (flickerDurationRef.current <= 0) {
        isFlickeringRef.current = false;
        return 1.0; // normal intensity factor
      }
      // Rapidly flicker between 0.15 and 0.8
      return Math.sin(elapsed * 100) > 0 ? 0.2 : 0.8;
    }

    return 1.0;
  };

  return {
    updateLampFlicker,
  };
}
