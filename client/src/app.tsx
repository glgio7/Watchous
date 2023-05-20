import React from "react";
import { GlobalCSS } from "./styles";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import SeriesDetails from "./pages/Details/series";
import FreeToWatch from "./pages/Watch";
import Credits from "./pages/Credits";
import Login from "./pages/Login";
import SearchContainer from "./pages/Search";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import FavoritesProvider from "./contexts/FavoritesContext";
import { useAuth } from "./hooks/useAuth";
import { useFromSearch } from "./hooks/useFromSearch";

const App = () => {
	const { searchValue } = useFromSearch();
	const { authenticated } = useAuth();

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
