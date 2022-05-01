import React from "react";
import { render } from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Game from "./routes/Game";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Game" element={<Game />} />
    </Routes>
  </HashRouter>,
  document.getElementById("root")
);
