import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { urlAPI } from "./api";
import { Toaster, toast } from "react-hot-toast";

const Assigment = () => {
  const [colabs, setColabs] = useState([]);
  const [forms, setForms] = useState([]);
  const [formSelected, setFormSelected] = useState(0);
  const [colabsSelected, setColabsSelected] = useState([]);

  const toogleColab = (colab_id) => {
    const index = colabsSelected.indexOf(colab_id);
    if (index === -1) setColabsSelected([...colabsSelected, colab_id]);
    else {
      const delColab = colabsSelected.filter((colab) => colab !== colab_id);
      setColabsSelected(delColab);
    }
  };
  const addAllColabs = (e) => {
    if (e.target.checked) {
      const newArray = [];
      colabs.map((colab) => newArray.push(colab.id));
      setColabsSelected(newArray);
    } else {
      setColabsSelected([]);
    }
  };
  const sendData = () => {
    if (formSelected > 0 && colabsSelected.length > 0) {
      axios
        .post(`${urlAPI}/assigment`, {
          colabs: colabsSelected,
          test: formSelected,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Formularios Enviados con Éxito!");
          }
        })

        .catch((err) => {
          toast.error("ups algo salio mal");
          console.log(err);
        });
    } else {
      toast.error("Selecciona al menos un colaborador y un cuestionario", {
        duration: 2000,
      });
    }
  };
  useEffect(() => {
    axios
      .get(`${urlAPI}/assigment`)
      .then((res) => {
        setColabs(res.data.colabs);
        setForms(res.data.forms);
        console.log(res.data.colabs);
        console.log(res.data.forms);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="">
      <Toaster />
      <select
        id="large"
        onChange={(e) => setFormSelected(e.target.value)}
        className="mx-auto m-10 block w-3/4 sm:w-1/2 px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option defaultValue="default">Selecciona un cuestionario</option>
        {forms.map((form, key) => (
          <option value={form.id} key={key}>
            {form.name}
          </option>
        ))}
      </select>
      <div className="overflow-x-auto w-full lg:w-1/2 mx-auto">
        <table
          data-theme="luxury"
          className="table table-zebra  w-full text-center border-2 border-gray-700"
        >
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => addAllColabs(e)}
                    className="checkbox rounded-full"
                    checked={colabsSelected.length > 0 ? true : false}
                  />
                </label>
              </th>
              <th>Nombre</th>
              <th>Foto</th>
            </tr>
          </thead>
          <tbody>
            {colabs &&
              colabs.map((colab, key) => (
                <tr key={key} onClick={() => toogleColab(colab.id)}>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox rounded-full"
                        checked={
                          colabsSelected.indexOf(colab.id) !== -1 ? true : false
                        }
                        readOnly
                      />
                    </label>
                  </th>
                  <td>
                    <div className="font-bold text-success">
                      {colab.name_colaborador}
                    </div>
                    <div className="text-sm text-accent-content opacity-50">
                      ID: {colab.id}
                    </div>
                  </td>
                  <td>
                    <img
                      className="avatar mask mask-squircle  w-16"
                      src={colab.avatar}
                      alt=""
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="text-center">
          <button
            onClick={sendData}
            className="btn w-1/2  btn-lg btn-success mt-20"
          >
            Enviar Formularios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assigment;
