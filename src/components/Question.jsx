import { useRef } from "react";
import PropTypes from "prop-types";
import { data } from "../utils/data";

function Question({ question }) {
  const quesTionsRef = useRef(data);

  const current = quesTionsRef.current[question];

  return (
    <div>
      <h1>{current.question}</h1>
      <ul>
        {current.options.map((option, index) => (
          <li key={`${index}-${option}`}>
            <button>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.number.isRequired,
};

export default Question;
