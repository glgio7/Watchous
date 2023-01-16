import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalCSS } from "./components/globalstyle";
import Home from "./pages/Home";
import Details from "./pages/Details";
import SeriesDetails from "./pages/Details/series";
import FreeToWatch from "./pages/Watch";
import Credits from "./pages/Credits";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalCSS />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/details/serie/:id" element={<SeriesDetails />} />
      <Route exact path="/freetowatch" element={<FreeToWatch />} />
      <Route exact path="/credits" element={<Credits />} />
    </Routes>
  </BrowserRouter>
);
