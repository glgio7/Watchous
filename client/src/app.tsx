import React, { useContext } from "react";
import { GlobalCSS } from "./styles";
import { Route, Routes } from "react-router-dom";
import { SearchContext } from "./contexts/SearchContext";
import { AuthContext } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Details from "./pages/Details";
import SeriesDetails from "./pages/Details/series";
import FreeToWatch from "./pages/Watch";
import Credits from "./pages/Credits";
import Header from "./components/Header";
import Login from "./pages/Login";
import SearchContainer from "./pages/Search";
import FavoritesProvider from "./contexts/FavoritesContext";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

const App = () => {
	const { searchValue } = useContext(SearchContext);
	const { authenticated } = useContext(AuthContext);

	return (
		<>
			<GlobalCSS />
			<Header />
			<FavoritesProvider>
				{searchValue && <SearchContainer />}
				{!searchValue && (
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/details/:id" element={<Details />} />
						<Route path="/details/series/:id" element={<SeriesDetails />} />
						<Route
							path="/freetowatch"
							element={authenticated ? <FreeToWatch /> : <Login />}
						/>
						<Route path="/credits" element={<Credits />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				)}
			</FavoritesProvider>
		</>
	);
};

export default App;
