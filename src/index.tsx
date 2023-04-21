import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import SeriesDetails from "./pages/Details/series";
import FreeToWatch from "./pages/Watch";
import Credits from "./pages/Credits";
import { GlobalCSS } from "./styles";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement!).render(
	<BrowserRouter>
		<GlobalCSS />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/details/:id" element={<Details />} />
			<Route path="/details/serie/:id" element={<SeriesDetails />} />
			<Route path="/freetowatch" element={<FreeToWatch />} />
			<Route path="/credits" element={<Credits />} />
		</Routes>
	</BrowserRouter>
);
