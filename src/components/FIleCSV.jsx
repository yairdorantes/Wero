import axios from "axios";
import { useState } from "react";
import { useCSVReader } from "react-papaparse";
import { urlAPI } from "./api";
import toast, { Toaster } from "react-hot-toast";

const FIleCSV = () => {
  const { CSVReader } = useCSVReader();
  const [data, setData] = useState();
  const sendCSVFile = () => {
    axios
      .post(`${urlAPI}/questions`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data === 200) {
          toast.success("Archivo CSV enviado exitosamente");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al enviar el archivo");
      });
  };

  return (
    <>
      <div className="">
        <Toaster />
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
                <div className="text-center mt-24">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg mb-5 "
                    {...getRootProps()}
                  >
                    Cargar Archivo
                  </button>
                  {acceptedFile && (
                    <div className="alert shadow-lg mb-3 w-1/2 mx-auto">
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
                  <div className="flex gap-3 justify-center">
                    <button
                      className="btn btn-lg btn-success"
                      onClick={sendCSVFile}
                    >
                      Enviar
                    </button>
                    <button
                      className="btn btn-lg btn-error"
                      {...getRemoveFileProps()}
                    >
                      Remover
                    </button>
                  </div>
                </div>
                {/* <ProgressBar style={styles.progressBarBackgroundColor} /> */}
              </>
            )}
          </CSVReader>
        </div>
      </div>
    </>
  );
};

export default FIleCSV;
