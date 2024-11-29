import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function ProgressBar({ time, decreaser, toNextQuestion }) {
  const [currentProgress, setCurrentProgress] = useState(time);

  useEffect(() => {
    if (currentProgress <= 0) {
      setCurrentProgress(time);
      toNextQuestion();
    }
  }, [currentProgress, time, toNextQuestion]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProgress((prev) => {
        return (prev -= decreaser);
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [decreaser, time]);

  return <progress value={currentProgress} max={time}></progress>;
}

ProgressBar.propTypes = {
  time: PropTypes.number.isRequired,
  decreaser: PropTypes.number.isRequired,
  toNextQuestion: PropTypes.func.isRequired,
};

export default ProgressBar;
