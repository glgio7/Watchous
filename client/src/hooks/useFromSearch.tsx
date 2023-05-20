import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

export const useFromSearch = () => {
	const context = useContext(SearchContext);

	return context;
};
