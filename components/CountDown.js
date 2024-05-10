"use client";
import { current } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";

const CountDown = ({ seconds }) => {
  const [currentSeconds, setCurrentSeconds] = useState(seconds % 60);
  const [currentMinutes, setCurrentMinutes] = useState(
    Math.floor(seconds / 60)
  );
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
