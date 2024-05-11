"use client";
import { current } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";

const CountDown = ({ seconds, setProgress }) => {
  const [currentSeconds, setCurrentSeconds] = useState(seconds % 60);
  const [currentMinutes, setCurrentMinutes] = useState(
    Math.floor(seconds / 60)
  );
  const [totalSeconds, setTotalSeconds] = useState(0);
  const intervalId = useRef();

  useEffect(() => {
    intervalId.current = setInterval(() => {
      // If the current seconds is 0 and minutes is not set the seconds to 59
      if (currentSeconds == 0 && currentMinutes != 0) {
        setCurrentMinutes((state) => state - 1);
        setCurrentSeconds(59);
      } else if (currentSeconds != 0) {
        // If the current seconds is not 0 reduce the second
        setCurrentSeconds((state) => state - 1);
      }
      const secondsNew = totalSeconds + 1;
      setTotalSeconds(secondsNew);
      setProgress((secondsNew / seconds) * 100);
    }, 1000);

    return () => clearInterval(intervalId.current);
  }, [currentMinutes, currentSeconds]);

  return (
    <div>
      {currentMinutes.toString().padStart(2, "0") +
        ":" +
        currentSeconds.toString().padStart(2, "0")}
    </div>
  );
};

export default CountDown;
