import axios from "axios";
import { useContext, useState } from "react";
import { urlAPI } from "./api";
import AuthContext from "./context/AuthContext";

const Form = () => {
  const [correo, setCorreo] = useState("");
  const [passWord, setPassWord] = useState("");
  const { loginUser } = useContext(AuthContext);
  const sendLogin = () => {
    const data = { email: correo, password: passWord };
    loginUser(data);
  };

  return (
    <div>
      <div className="w-full mx-auto mt-24 max-w-xs">
        <div className="alert alert-success mb-10">
          Inicio de sesion de esclavo 😀
        </div>
        <form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="username"
            >
              Correo
            </label>
            <input
              className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassWord(e.target.value)}
              className="shadow appearance-none border bg-white border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={sendLogin}
              className="bg-blue-500 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Ingresar
            </button>
            {/* <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a> */}
          </div>
        </form>
        <p className="text-center text-white text-xs">
          &copy;2023 Corporacion Bebote. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Form;
