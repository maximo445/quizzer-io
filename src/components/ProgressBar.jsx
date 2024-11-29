import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function ProgressBar({
  time,
  decreaser,
  toNextQuestion,
  handSetQuestionAnswerd,
}) {
  const [currentProgress, setCurrentProgress] = useState(time);

  // useCallBack on useEffect dependencies when finalizing app

  useEffect(() => {
    if (currentProgress <= 0) {
      setCurrentProgress(time);
      handSetQuestionAnswerd({ index: null, isRight: null });
      toNextQuestion();
    }
  }, [currentProgress, handSetQuestionAnswerd, time, toNextQuestion]);

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

  return (
    <progress
      className="h-2 w-3/4 rounded-sm"
      value={currentProgress}
      max={time}
    ></progress>
  );
}

ProgressBar.propTypes = {
  time: PropTypes.number.isRequired,
  decreaser: PropTypes.number.isRequired,
  toNextQuestion: PropTypes.func.isRequired,
  handSetQuestionAnswerd: PropTypes.func.isRequired,
};

export default ProgressBar;
