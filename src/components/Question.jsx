import { useRef, forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { data } from "../utils/data";
import ProgressBar from "./ProgressBar";

const TIME = 8000;

const Question = forwardRef(
  ({ handleSetQuizEnded, currentQuestion, setCurrentQuestion }, ref) => {
    const quesTionsRef = useRef(data);
    const current = quesTionsRef.current[currentQuestion];
    const [questionAnswered, setQuestionAnswered] = useState(() => {
      return { option: null, isRight: null };
    });
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
        const isUserRight = userAnswer === correctAnswer;
        ref.current[index] = { isUserRight, userAnswer, question };
        setDecreaser(() => 400);
        // Chat GPT what is wrong with the below line of code?
        setQuestionAnswered({
          isRight: isUserRight,
          index: index,
        });
      }
    }

    return (
      <div className="flex flex-col justify-center items-center bg-purple-950 text-slate-50 w-full rounded-lg p-8">
        <ProgressBar
          time={TIME}
          decreaser={decreaser}
          toNextQuestion={handleAdvance}
          handSetQuestionAnswerd={setQuestionAnswered}
        ></ProgressBar>
        <h1 className="mb-3 font-bold mt-5">{current.question}</h1>
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
                className={` w-full text-slate-50 font-semibold py-1 rounded-full ${
                  questionAnswered.index === index &&
                  questionAnswered.isRight === true
                    ? "bg-green-500"
                    : ""
                } ${
                  questionAnswered.index === index &&
                  questionAnswered.isRight === false
                    ? "bg-red-500"
                    : ""
                } ${questionAnswered.index === null ? "bg-blue-500" : ""}`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

Question.displayName = "Question";

Question.propTypes = {
  handleSetQuizEnded: PropTypes.func.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  setCurrentQuestion: PropTypes.func.isRequired,
};

export default Question;
