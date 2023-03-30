import { useContext } from "react";
import AuthContext from "../components/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/form" />;
};

export default PrivateRoutes;
