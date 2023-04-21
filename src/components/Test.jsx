import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urlAPI } from "./api";
import AuthContext from "./context/AuthContext";

const Test = () => {
  const paramsUrl = useParams();
  const { user } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState();
  const [isSent, setIsSent] = useState(false);
  // console.log(questions);
  // console.log(user);
  const [response, setResponse] = useState(() => {
    const storedUser = localStorage.getItem(
      `${user.id}response${paramsUrl.id}`
    );
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const getResults = () => {
    setIsSent(true);
    let cont = 0,
      percentage = 0;
    for (const i in response) if (response[i] === "answer") cont++;
    percentage = (cont / questions.length) * 100;
    setScore(percentage.toFixed(2));
    axios
      .post(`${urlAPI}/ass`, {
        user: user.colaborador,
        test: paramsUrl.id,
        score: percentage.toFixed(2),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${urlAPI}/questions/${paramsUrl.id}/${user.colaborador}`)
      .then((res) => {
        setQuestions(res.data.questions);
        setStatus(res.data.status);
        if (res.data.status === "Calificado") setScore(res.data.score);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `${user.id}response${paramsUrl.id}`,
      JSON.stringify(response)
    );
  }, [response]);

  return (
    <div className="m-10 w-3/4 mx-auto">
      <div>
        {questions.length > 0 ? (
          questions.map((question, i) => (
            <div key={i}>
              <h1 className="text-2xl bg-neutral p-2 rounded-md m-3">
                <span className="font-bold">{i + 1}.</span> {question.question}
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
                        checked={
                          response &&
                          response[question.id] === Object.keys(answer)[0]
                            ? true
                            : false
                        }
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
        {isSent || status === "Calificado" ? (
          <div className="alert shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                Tu calificacion es del
                <span className="text-blue-100"> {score}%</span>
              </span>
            </div>
          </div>
        ) : (
          questions.length > 0 && (
            <button onClick={getResults} className="btn w-3/4 text-center">
              Enviar{" "}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Test;
