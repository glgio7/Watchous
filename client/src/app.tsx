import React, { useContext } from "react";
import { GlobalCSS } from "./styles";
import { Route, Routes } from "react-router-dom";
import { SearchContext } from "./contexts/SearchContext";
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
import AuthProvider from "./contexts/AuthContext";
import Register from "./pages/Register";

const App = () => {
	const { searchValue } = useContext(SearchContext);

	return (
		<AuthProvider>
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
						<Route path="/freetowatch" element={<FreeToWatch />} />
						<Route path="/credits" element={<Credits />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				)}
			</FavoritesProvider>
		</AuthProvider>
	);
};

export default App;
