import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import SeriesDetails from "./pages/Details/series";
import FreeToWatch from "./pages/Watch";
import Credits from "./pages/Credits";
import { GlobalCSS } from "./styles";
import Header from "./components/Header";
import { SearchContext } from "./contexts/SearchContext";

const App = () => {
	const { searchValue, setSearchValue } = useContext(SearchContext);
	return (
		<>
			<GlobalCSS />
			<Header searchValue={searchValue} setSearchValue={setSearchValue} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/details/:id" element={<Details />} />
				<Route path="/details/series/:id" element={<SeriesDetails />} />
				<Route path="/freetowatch" element={<FreeToWatch />} />
				<Route path="/credits" element={<Credits />} />
			</Routes>
		</>
	);
};

export default App;
