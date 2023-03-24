import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlAPI } from "./api";
import AuthContext from "./context/AuthContext";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [assigments, setAssigments] = useState([]);
  const { user } = useContext(AuthContext);
  const getData = () => {
    axios.get(`${urlAPI}/collaborator/${user.colaborador}`).then((res) => {
      setUserData({ ...user, ...res.data.collaborator });
    });
  };

  const getAssignments = () => {
    axios
      .get(`${urlAPI}/ass/${user.id}`)
      .then((res) => {
        console.log(res.data.results);
        setAssigments(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
    getAssignments();
  }, []);

  return (
    <div>
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
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
                        {assigments.length}
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
                    <li>
                      <span className="font-bold text-gray-800">Status:</span>{" "}
                      {userData && userData.status}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mx-auto justify-center gap-4 w-3/4 flex-wrap">
        {assigments.map((ass, i) => (
          <Link key={i} to={`/test/${ass.test_id}`}>
            <button className="btn">Questionario {i + 1}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
