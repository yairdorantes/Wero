import React from "react";
import { Route, Routes } from "react-router-dom";
import FIleCSV from "../components/FIleCSV";
import Form from "../components/Form";
import Profile from "../components/Profile";
import Test from "../components/Test";
import Welcome from "../components/Welcome";

const MyRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/test/:id" element={<Test />} />
      <Route path="/file" element={<FIleCSV />} />
      <Route path="/form" element={<Form />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default MyRoute;
