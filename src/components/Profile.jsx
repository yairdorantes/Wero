import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlAPI } from "./api";
import AuthContext from "./context/AuthContext";
import Graph from "./Graph";
import bg from "../media/bg2.jpg";
const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [assigments, setAssigments] = useState([]);
  const [count, setCount] = useState(0);
  const { user, logoutUser } = useContext(AuthContext);
  const getData = () => {
    axios.get(`${urlAPI}/collaborator/${user.colaborador}`).then((res) => {
      setUserData({ ...user, ...res.data.collaborator });
    });
  };

  const getAssignments = () => {
    axios
      .get(`${urlAPI}/ass/${user.colaborador}`)
      .then((res) => {
        setAssigments(res.data.results);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
    getAssignments();
  }, []);
  useEffect(() => {
    let cont = 0;
    assigments.forEach((res) => {
      if (res.status !== "Calificado") cont++;
    });
    setCount(cont);
  }, [assigments]);
  console.log(userData);
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(4, 4, 4, 0.696), rgba(12, 12, 12, 0.77)), url(${bg})`,
      }}
    >
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-3xl mx-auto bg-gray-300 rounded-lg shadow-md">
            <div className="px-6 py-4">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img
                    src={userData && userData.avatar}
                    alt="Profile Picture"
                    className="w-full rounded-lg mb-4 md:mb-0"
                  />
                  {assigments.length > 0 && (
                    <div className="indicator mt-5 mb-5">
                      <span className="indicator-item badge badge-error font-bold">
                        {count}
                      </span>
                      <button className="alert alert-info font-bold">
                        Cuestionarios pendientes
                      </button>
                    </div>
                  )}
                </div>
                <div className="md:w-2/3  md:pl-6">
                  <h1 className="text-2xl font-bold text-gray-800 ">
                    {userData && userData.name_colaborador}
                  </h1>
                  <p className="text-gray-700 text-lg mb-2">
                    Esclavo no. {userData && userData.id}
                  </p>
                  <div className="text-primary-content font-bold badge mb-2 p-4 badge-primary ">
                    {userData && userData.profile}
                  </div>
                  {userData && userData.profile === "admin" && (
                    <div className="flex flex-wrap gap-2">
                      <Link to={"/file"}>
                        <button className="btn btn-sm btn-info">
                          agregar csv{" "}
                        </button>
                      </Link>
                      <Link to="/assigment">
                        <button className="btn btn-sm btn-accent">
                          agregar asignacion{" "}
                        </button>
                      </Link>
                      <Link to={"/per_section"}>
                        <button className="btn btn-sm btn-secondary">
                          agregar asignaciones{" "}
                        </button>
                      </Link>
                    </div>
                  )}
                  <ul className="flex flex-col text-gray-600 space-y-2">
                    <li>
                      <span className="font-bold text-gray-800">Email:</span>{" "}
                      {userData && userData.email}
                    </li>
                    <li>
                      <span className="font-bold text-gray-800">Celular:</span>{" "}
                      {userData && userData.phone}
                    </li>
                    <li>
                      <span className="font-bold text-gray-800">
                        Direccion:
                      </span>{" "}
                      {userData && userData.address}
                    </li>
                    {/* <li>
                      <span className="font-bold text-gray-800">Status:</span>{" "}
                      {userData && userData.status}
                    </li> */}
                    <li>
                      <span className="font-bold text-gray-800">Area:</span>{" "}
                      <span className="text-red-700 font-bold">
                        {userData && userData.area_name}
                      </span>
                    </li>
                    <li>
                      <button
                        onClick={logoutUser}
                        className="btn btn-error btn-sm"
                      >
                        Salir
                        <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6 ml-3"
                          fill="currentColor"
                          height="1em"
                          width="1em"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 018 4h-2.71a8 8 0 10.001 12h2.71A9.985 9.985 0 0112 22zm7-6v-3h-8v-2h8V8l5 4-5 4z" />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {count > 0 && (
        <div className="text-center mb-5">
          <div className="badge badge-primary text-center p-5 font-bold">
            Questionarios:{" "}
          </div>
        </div>
      )}
      <div className="flex">
        <div className="flex mx-auto justify-center gap-4 w-3/4 flex-wrap">
          <div className="badge p-5 badge-primary font-bold">Pendientes: </div>
          {assigments &&
            assigments.map((ass, i) => {
              if (ass.status !== "Calificado") {
                return (
                  <Link key={i} to={`/test/${ass.test__id}`}>
                    <button className="btn btn-accent">{ass.test__name}</button>
                  </Link>
                );
              }
            })}
        </div>
        <div className="flex mx-auto justify-center gap-4 w-3/4 flex-wrap">
          <div className="badge p-5 badge-primary font-bold">Calificados:</div>
          {assigments &&
            assigments.map((ass, i) => {
              if (ass.status === "Calificado") {
                return (
                  <Link key={i} to={`/test/${ass.test__id}`}>
                    <button className="btn bg-gray-600 text-black btn-disabled">
                      {ass.test__name}
                    </button>
                  </Link>
                );
              }
            })}
        </div>
      </div>
      <Graph results={assigments} />
    </div>
  );
};

export default Profile;
