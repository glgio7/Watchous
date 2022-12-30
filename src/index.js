import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalCSS } from "./components/globalstyle";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Details } from "./pages/Details";
import { SeriesDetails } from "./pages/Details/series";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalCSS />
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/details/:id" element={<Details/>} />
      <Route path="/details/serie/:id" element={<SeriesDetails/>} />
    </Routes>
  </BrowserRouter>
);
