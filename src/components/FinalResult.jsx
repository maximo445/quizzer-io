import PropTypes from "prop-types";

function calc(num) {
  return Math.round((num / 10) * 100);
}

function FinalResult({ finalResult }) {
  const questionSkipped = finalResult.filter(
    (element) => element === null
  ).length;

  const rightAnswers = finalResult.filter(
    (element) => element?.isUserRight === true
  ).length;

  const wrongAnswers = finalResult.filter(
    (element) => element?.isUserRight === false
  ).length;

  console.log({ questionSkipped, rightAnswers, wrongAnswers });

  return (
    <div className="h-screen w-full justify-center items-center">
      <header className="w-4/5">
        <h1>QUIZZER-IO</h1>
        <h1>QUIZ COMPLETED!</h1>
        <ul>
          <li>
            <h1>{calc(questionSkipped)}%</h1>
            <p>SKIPPED</p>
          </li>
          <li>
            <h1>{calc(rightAnswers)}%</h1>
            <p>ANSWERED</p>
            <p>CORRECTLY</p>
          </li>
          <li>
            <h1>{calc(wrongAnswers)}%</h1>
            <p>ANSWERED</p>
            <p>INCORRECTLY</p>
          </li>
        </ul>
      </header>
    </div>
  );
}

FinalResult.propTypes = {
  finalResult: PropTypes.array.isRequired,
};

export default FinalResult;
