import { useRef, useState } from "react";
import Question from "./components/Question";
import FinalResult from "./components/FinalResult";

const initialAnswers = new Array(10).fill(null);

const buttonStyling =
  "px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md border border-gray-300 hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1";

function App() {
  const [quizEnded, setQuizEnded] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const anwersRef = useRef([...initialAnswers]);

  function handleStartQuiz() {
    setQuizStarted(true);
    setCurrentQuestion(0);
  }

  function restart() {
    setQuizStarted(false);
    setQuizEnded(false);
    anwersRef.current = [...initialAnswers];
  }

  return (
    <div
      className={`flex justify-center items-center w-screen bg-blue-950 ${
        quizEnded ? "h-full" : "h-screen"
      }`}
    >
      <div className="w-10/12 sm:w-4/6 flex justify-center">
        {!quizStarted && (
          <button className={buttonStyling} onClick={handleStartQuiz}>
            Start Quiz
          </button>
        )}

        {quizStarted && !quizEnded && (
          <Question
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            ref={anwersRef}
            handleSetQuizEnded={setQuizEnded}
          ></Question>
        )}
        {quizEnded && (
          <FinalResult handleRestart={restart} finalResult={anwersRef.current}>
            Game Over
          </FinalResult>
        )}
      </div>
    </div>
  );
}

export default App;
