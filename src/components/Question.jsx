import { useRef, forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { data } from "../utils/data";
import ProgressBar from "./ProgressBar";

const TIME = 8000;

const Question = forwardRef(({ handleSetQuizEnded }, ref) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const quesTionsRef = useRef(data);
  const current = quesTionsRef.current[currentQuestion];

  console.log(current.question);

  const [decreaser, setDecreaser] = useState(50);

  function handleAdvance() {
    if (currentQuestion < 9) {
      setCurrentQuestion((prevState) => {
        return (prevState += 1);
      });
      setDecreaser(50);
    } else {
      handleSetQuizEnded(true);
    }
  }

  function handleCheckAnswer(index, userAnswer, correctAnswer, question) {
    if (ref.current[index] === null) {
      setDecreaser(200);
      const isUserRight = userAnswer === correctAnswer;
      ref.current[index] = { isUserRight, userAnswer, question };
    }
  }

  return (
    <div className="flex flex-col justify-center items-center bg-purple-950 text-slate-50 w-full rounded-lg p-8">
      <ProgressBar
        time={TIME}
        decreaser={decreaser}
        toNextQuestion={handleAdvance}
      ></ProgressBar>
      <h1 className="mb-3">{current.question}</h1>
      <ul className="flex flex-col items-center gap-2 w-4/5">
        {current.options.map((option, index) => (
          <li className="w-full" key={`${index}-${option}`}>
            <button
              onClick={() =>
                handleCheckAnswer(
                  currentQuestion,
                  option,
                  current.answer,
                  current.question
                )
              }
              className={`bg-blue-400 w-full text-slate-600 py-1 rounded-full`}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

Question.displayName = "Question";

Question.propTypes = {
  handleSetQuizEnded: PropTypes.func.isRequired,
};

export default Question;
