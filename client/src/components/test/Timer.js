import { useEffect, useState } from "react";

function Timer({ duration, onTimeUp }) {

  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 && !ended) {
      setEnded(true);
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, ended]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={`timer ${timeLeft < 60 ? "danger" : ""}`}>
      ⏱ {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default Timer;