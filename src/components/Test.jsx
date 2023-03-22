import axios from "axios";
import { useEffect, useState } from "react";
import { urlAPI } from "./api";

const Test = () => {
  const [questions, setQuestions] = useState([]);

  const shuffleAnswers = (answers) => {
    const shuffledAnswers = [...answers];
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [
        shuffledAnswers[j],
        shuffledAnswers[i],
      ];
    }
    return shuffledAnswers;
  };
  useEffect(() => {
    axios
      .get(`${urlAPI}/questions`)
      .then((res) => {
        console.log(res.data.questions);
        setQuestions(res.data.questions);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="m-10">
      <div>
        {questions.length > 0 ? (
          questions.map((question, i) => (
            <div key={i}>
              <h1 className="text-2xl">{question.question}</h1>
              <div className="form-control">
                {shuffleAnswers([
                  question.answer,
                  question.distractors[0],
                  question.distractors[1],
                  question.distractors[2],
                ]).map((answer, j) => (
                  <div key={j}>
                    <label className="label cursor-pointer w-48">
                      <span className="label-text">{answer}</span>
                      <input
                        type="radio"
                        name={`radio-${i}`}
                        className="radio checked:bg-red-500"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-warning shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Aun no hay preguntas!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
