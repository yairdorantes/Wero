import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlAPI } from "./api";
import AuthContext from "./context/AuthContext";
import Graph from "./Graph";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [assigments, setAssigments] = useState([]);
  const [count, setCount] = useState(0);
  const { user } = useContext(AuthContext);
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
    <div className="h-screen bg-neutral-focus ">
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-3xl mx-auto bg-gray-200 rounded-lg shadow-md">
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
                      <button className="alert alert-warning font-bold">
                        Cuestionarios pendientes
                      </button>
                    </div>
                  )}
                </div>
                <div className="md:w-2/3  md:pl-6">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {userData && userData.name_colaborador}
                  </h1>
                  <p className="text-gray-700 text-lg mb-4">
                    Esclavo no. {userData && userData.id}
                  </p>
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
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {count > 0 && (
        <div className="text-center mb-5">
          <div className="badge badge-primary text-center">Questionarios: </div>
        </div>
      )}
      <div className="flex">
        <div className="flex mx-auto justify-center gap-4 w-3/4 flex-wrap">
          <div>Por contestar: </div>
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
          <div>Contestados:</div>
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
