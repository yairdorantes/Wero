import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";
import { urlAPI } from "./api";

const PerSection = () => {
  const [sections, setSections] = useState([]);
  const [areas, setAreas] = useState([]);
  const [areasSelected, setAreasSelected] = useState([]);
  const [sectionsSelected, setSectionsSelected] = useState([]);

  const getData = () => {
    axios
      .get(`${urlAPI}/per_section`)
      .then((res) => {
        console.log(res);
        setSections(res.data.sections);
        setAreas(res.data.areas);
      })
      .catch((err) => console.error(err));
  };

  const handleChangeAreas = (id) => {
    const index = areasSelected.indexOf(id);
    if (index === -1) {
      setAreasSelected([...areasSelected, id]);
    } else {
      const newArray = [...areasSelected];
      newArray.splice(index, 1);
      setAreasSelected(newArray);
    }
  };

  const handleChangeSection = (id) => {
    const index = sectionsSelected.indexOf(id);
    if (index === -1) {
      setSectionsSelected([...sectionsSelected, id]);
    } else {
      const newArray = [...sectionsSelected];
      newArray.splice(index, 1);
      setSectionsSelected(newArray);
    }
  };

  const sendData = () => {
    // console.log(areasSelected, sectionsSelected);
    if (areasSelected.length > 0 && sectionsSelected.length > 0) {
      axios
        .post(`${urlAPI}/per_section`, {
          areas: areasSelected,
          sections: sectionsSelected,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200)
            toast.success("Cuestionarios Enviados Exitosamente! ");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Algo salió mal :(");
        });
    } else {
      toast.error("Debe seleccionar al menos un cuestionario y área");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Toaster />
      <div className="text-center font-bold mb-3 text-2xl">
        Apply Assigments
      </div>

      <div className="text-center">
        <div className="badge badge-secondary badge-lg mb-5 font-bold  text-teal-300">
          Areas
        </div>
        <div className="flex gap-4  flex-wrap justify-center">
          {areas.map((area) => (
            <div
              onClick={() => handleChangeAreas(area.id)}
              className="bg-secondary  p-2 px-4 rounded-sm flex items-center justify-center flex-col gap-1"
            >
              <div className="text-white font-bold">{area.name}</div>
              <input
                readOnly
                // data-theme=""
                checked={areasSelected.includes(area.id) ? true : false}
                // onChange={() => handleChangeAreas(area.id)}
                type="checkbox"
                className="checkbox text-center rounded-full"
              />
            </div>
          ))}
        </div>
        <div className="badge badge-info badge-lg font-bold mb-5 mt-5 text-teal-300">
          Cuestionarios
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {sections.map((section) => (
            <div
              onClick={() => handleChangeSection(section.id)}
              className="bg-info p-2 px-4 rounded-sm flex  items-center justify-center flex-col gap-1"
            >
              <div className="text-white font-bold">{section.name}</div>
              <input
                type="checkbox"
                checked={sectionsSelected.includes(section.id) ? true : false}
                // onChange={}
                readOnly
                className="checkbox rounded-full"
              />
            </div>
          ))}
        </div>
        <div className="mx-auto text-center mt-10">
          <button className="btn btn-success" onClick={() => sendData()}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerSection;
