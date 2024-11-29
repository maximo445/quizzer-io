import { useState } from "react";
import Question from "./components/Question";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  function handleAdvance() {
    setCurrentQuestion((prevState) => ++prevState);
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div>
        <Question question={currentQuestion} />
        <button onClick={handleAdvance}>next</button>
      </div>
    </div>
  );
}

export default App;
