import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { GlobalCSS } from "./components/globalstyle";
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
