import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urlAPI } from "./api";

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [corrects, setCorrects] = useState(0);
  const [response, setResponse] = useState([]);
  const paramsUrl = useParams();

  const getResults = () => {
    for (const i in response) {
      if (response[i] === "answer") {
        setCorrects(corrects + 1);
      }
    }
    console.log(corrects);
  };

  useEffect(() => {
    axios
      .get(`${urlAPI}/questions/${paramsUrl.id}`)
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data.questions);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="m-10 w-3/4 mx-auto">
      <div>
        {questions.length > 0 ? (
          questions.map((question, i) => (
            <div key={i}>
              <h1 className="text-2xl bg-neutral p-2 rounded-md m-3">
                {i + 1}. {question.question}
              </h1>
              <div className="form-control w-48 ml-4 ">
                {question.answers.map((answer, j) => (
                  <div key={j}>
                    <label className="label cursor-pointer">
                      <input
                        onChange={(e) =>
                          setResponse({
                            ...response,
                            [question.id]: e.target.value,
                          })
                        }
                        type="radio"
                        value={Object.keys(answer)[0]}
                        name={`radio-${i}`}
                        className="radio checked:bg-red-500"
                      />
                      <span className="label-text ml-2 bg-gray-600 min-w-full p-2 rounded-md">
                        {Object.values(answer)[0]}
                      </span>
                    </label>
                    {/* {Object.keys(answer)[0]}: {Object.values(answer)[0]} */}
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
      <div className="text-center">
        <button className="btn w-3/4 text-center">Enviar </button>
      </div>
    </div>
  );
};

export default Test;
