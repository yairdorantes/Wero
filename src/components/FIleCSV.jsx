import axios from "axios";
import { useState } from "react";
import { useCSVReader } from "react-papaparse";
import { urlAPI } from "./api";

const FIleCSV = () => {
  const { CSVReader } = useCSVReader();
  const [data, setData] = useState();
  const sendCSVFile = () => {
    axios
      .post(`${urlAPI}/questions`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="">
        <div className="App">
          <CSVReader
            onUploadAccepted={(results) => {
              console.log(results);
              setData(results);
            }}
          >
            {({
              getRootProps,
              acceptedFile,
              ProgressBar,
              getRemoveFileProps,
            }) => (
              <>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    {...getRootProps()}
                  >
                    Cargar Archivo
                  </button>
                  {acceptedFile && (
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
                          Se enviara el siguiente archivo:{" "}
                          <span className="font-bold">
                            {acceptedFile && acceptedFile.name}
                          </span>
                        </span>
                      </div>
                    </div>
                  )}
                  <button className="btn btn-error" {...getRemoveFileProps()}>
                    Remover
                  </button>
                </div>
                {/* <ProgressBar style={styles.progressBarBackgroundColor} /> */}
              </>
            )}
          </CSVReader>
        </div>
      </div>
      <button className="btn btn-success" onClick={sendCSVFile}>
        Enviar
      </button>
    </>
  );
};

export default FIleCSV;
