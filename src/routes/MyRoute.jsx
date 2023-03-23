import React from "react";
import { Route, Routes } from "react-router-dom";
import FIleCSV from "../components/FIleCSV";
import Form from "../components/Form";
import Test from "../components/Test";

const MyRoute = () => {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/file" element={<FIleCSV />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  );
};

export default MyRoute;
