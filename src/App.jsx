import { useRef, useState } from "react";
import Question from "./components/Question";
import FinalResult from "./components/FinalResult";

const initialAnswers = new Array(10).fill(null);

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
    anwersRef.current([...initialAnswers]);
  }

  return (
    <div
      className={`flex justify-center items-center w-screen bg-blue-950 ${
        quizEnded ? "h-full" : "h-screen"
      }`}
    >
      <div className="w-4/6 flex justify-center">
        {!quizStarted && <button onClick={handleStartQuiz}>Start Quiz</button>}

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
