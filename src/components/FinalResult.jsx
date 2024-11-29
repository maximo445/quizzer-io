import PropTypes from "prop-types";

function calc(num) {
  return Math.round((num / 10) * 100);
}

function FinalResult({ finalResult, handleRestart }) {
  const questionSkipped = finalResult.filter(
    (element) => element === null
  ).length;

  const rightAnswers = finalResult.filter(
    (element) => element?.isUserRight === true
  ).length;

  const wrongAnswers = finalResult.filter(
    (element) => element?.isUserRight === false
  ).length;

  const buttonStyling =
    "px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md border border-gray-300 hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1";

  return (
    <div className="flex flex-col h-full w-4/5 justify-center items-center bg-purple-600 rounded-lg p-5 m-8">
      <div className="flex justify-end w-full">
        <button className={buttonStyling} onClick={handleRestart}>
          restart
        </button>
      </div>
      <header className="flex flex-col items-center w-5/6">
        <h1>QUIZZER-IO</h1>
        <h1 className="mb-5 text-5xl">QUIZ COMPLETED!</h1>
        <ul className="flex justify-around w-full border-b-[1px] border-gray-800 py-5 mb-8">
          <li>
            <h1 className="text-4xl">{calc(questionSkipped)}%</h1>
            <p className="text-xs">SKIPPED</p>
          </li>
          <li>
            <h1 className="text-4xl">{calc(rightAnswers)}%</h1>
            <p className="text-xs">ANSWERED</p>
            <p className="text-xs">CORRECTLY</p>
          </li>
          <li>
            <h1 className="text-4xl">{calc(wrongAnswers)}%</h1>
            <p className="text-xs">ANSWERED</p>
            <p className="text-xs">INCORRECTLY</p>
          </li>
        </ul>
        <ul className="flex flex-col gap-8 py-10">
          {finalResult.map((item, index) => {
            if (!item) {
              return (
                <li key={index}>
                  <h1 className="flex justify-center items-center h-8 w-8 bg-slate-900 rounded-full text-slate-300">
                    {index + 1}
                  </h1>
                  <p>Question Skipped</p>
                </li>
              );
            }
            return (
              <li className="flex flex-col items-center" key={item.question}>
                <h1 className="flex justify-center items-center h-8 w-8 bg-slate-900 rounded-full text-slate-300">
                  {index + 1}
                </h1>
                <p>{item.question}</p>
                <p
                  className={
                    item.isUserRight ? "text-green-500" : "text-red-500"
                  }
                >
                  {item.userAnswer}
                </p>
              </li>
            );
          })}
        </ul>
      </header>
    </div>
  );
}

FinalResult.propTypes = {
  finalResult: PropTypes.array.isRequired,
  handleRestart: PropTypes.func.isRequired,
};

export default FinalResult;
