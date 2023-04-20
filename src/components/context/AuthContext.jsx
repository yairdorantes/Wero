import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAPI } from "../api";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isOpenAuth, setIsOpenAuth] = useState(true);
  let [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateData = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const loginUser = (credentials) => {
    axios
      .post(`${urlAPI}/login`, credentials)
      .then((res) => {
        if (res.data.user) {
          //   console.log(res.data.success);
          setUser(res.data.user);
          console.log(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/");
        }
        // setIsOpen(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        // setIsOpenAuth(true);
        // setTimeout(() => {
        //   setIsError(false);
        // }, 2500);
      });
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const contextData = {
    loginUser,
    user,
    updateData,
    logoutUser,
    // isOpenAuth,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
