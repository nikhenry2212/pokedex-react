import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Home } from "../pages/Home/Home";

export const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Home/>} path="/"></Route>
      </Routes>
    </Router>
  );
};
