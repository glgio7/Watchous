import { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";

export const useFavorites = () => {
	const context = useContext(FavoritesContext);

	return context;
};
