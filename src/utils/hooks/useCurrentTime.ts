import { useState, useEffect, useRef } from "react";

// Custom hook
const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const formattedTimeRef = useRef<string>("");
  const formattedDateRef = useRef<string>("");

  useEffect(() => {
    const updateFormattedTime = () => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      formattedTimeRef.current = `${hours}:${minutes}:${seconds}`;

      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
      };
      formattedDateRef.current = date.toLocaleDateString("en-US", options);

      setCurrentTime(date);
    };

    updateFormattedTime();
    const intervalId = setInterval(updateFormattedTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = () => formattedTimeRef.current;
  const formatDate = () => formattedDateRef.current;

  return {
    formatTime,
    formatDate,
  };
};

export default useCurrentTime;
