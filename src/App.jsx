import { useRef, useState } from "react";
import Question from "./components/Question";
import FinalResult from "./components/FinalResult";

const initialAnswers = new Array(10).fill(null);

function App() {
  const [quizEnded, setQuizEnded] = useState(false);
  const anwersRef = useRef([...initialAnswers]);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className=" w-full sm:w-4/5">
        {!quizEnded ? (
          <Question
            ref={anwersRef}
            handleSetQuizEnded={setQuizEnded}
          ></Question>
        ) : (
          <FinalResult finalResult={anwersRef.current}>Game Over</FinalResult>
        )}
      </div>
    </div>
  );
}

export default App;
