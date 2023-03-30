import axios from "axios";
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
    axios
      .post(`${urlAPI}/per_section`, {
        areas: areasSelected,
        sections: sectionsSelected,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="text-center font-bold mb-3 text-2xl">
        Apply Assigments
      </div>
      <div>
        <div className="text-center text-teal-300">Areas</div>
        <div className="flex gap-4 justify-center">
          {areas.map((area) => (
            <div className="">
              <div className="">{area.name}</div>
              <input
                onChange={() => handleChangeAreas(area.id)}
                type="checkbox"
                className="checkbox "
              />
            </div>
          ))}
        </div>
        <div className="text-center text-teal-300">Cuestionarios</div>
        <div className="flex gap-4 justify-center">
          {sections.map((section) => (
            <div className="">
              <div className="">{section.name}</div>
              <input
                type="checkbox"
                // checked={sectionsSelected.includes(section.id) ? true : false}
                onChange={() => handleChangeSection(section.id)}
                className="checkbox"
              />
            </div>
          ))}
        </div>
        <div className="mx-auto text-center">
          <button className="btn btn-success" onClick={() => sendData()}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerSection;
