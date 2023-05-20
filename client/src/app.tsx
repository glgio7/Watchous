import React from "react";
import { GlobalCSS } from "./styles";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SearchContainer from "./pages/Search";
import { useFromSearch } from "./hooks/useFromSearch";
import FavoritesProvider from "./contexts/FavoritesContext";
import AppRoutes from "./routes";

const App = () => {
	const { searchValue } = useFromSearch();

	return (
		<>
			<GlobalCSS />
			<Header />
			<FavoritesProvider>
				{searchValue && <SearchContainer />}
				{!searchValue && <AppRoutes />}
			</FavoritesProvider>
		</>
	);
};

export default App;
