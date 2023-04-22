import React from "react";
import { Route, Routes } from "react-router-dom";
import FIleCSV from "../components/FIleCSV";
import Form from "../components/Form";
import PerSection from "../components/PerSection";
import Profile from "../components/Profile";
import Test from "../components/Test";
// import Welcome from "../components/Welcome";
import PrivateRoutes from "./PrivateRoutes";
import Assigment from "../components/Assigment";

const MyRoute = () => {
  return (
    <Routes>
      <Route path="/form" element={<Form />} />
      <Route element={<PrivateRoutes />}>
        {/* <Route path="/" element={<Welcome />} /> */}
        <Route path="/test/:id" element={<Test />} />
        <Route path="/file" element={<FIleCSV />} />
        <Route path="/" element={<Profile />} />
        <Route path="/per_section" element={<PerSection />} />
        <Route path="/assigment" element={<Assigment />} />
      </Route>
    </Routes>
  );
};

export default MyRoute;
