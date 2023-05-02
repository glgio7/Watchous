import React, { createContext, useState, useEffect } from "react";
import { ISearchContext, SearchProviderProps } from "./types";
import { IMovie } from "../../components/MovieCard/types";

export const SearchContext = createContext<ISearchContext>(
	{} as ISearchContext
);

const SearchProvider = ({ children }: SearchProviderProps) => {
	const apiKey = process.env.REACT_APP_API_KEY;
	const [searchValue, setSearchValue] = useState<string>("");
	const [moviesFromSearch, setMoviesFromSearch] = useState<IMovie[]>([]);
	const [seriesFromSearch, setSeriesFromSearch] = useState<IMovie[]>([]);

	//////////////////// search
	useEffect(() => {
		const movies = () => {
			fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}&language=pt-BR`
			)
				.then((response) => response.json())
				.then((data) => setMoviesFromSearch(data.results))
				.catch((err) => console.log(err));
		};

		const series = () => {
			fetch(
				`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${searchValue}&language=pt-BR`
			)
				.then((response) => response.json())
				.then((data) => setSeriesFromSearch(data.results))
				.catch((err) => console.log(err));
		};
		Promise.all([movies(), series()]);
	}, [searchValue]);

	const contextValues: ISearchContext = {
		searchValue,
		setSearchValue,
		moviesFromSearch,
		seriesFromSearch,
		setMoviesFromSearch,
		setSeriesFromSearch,
	};

	return (
		<SearchContext.Provider value={contextValues}>
			{children}
		</SearchContext.Provider>
	);
};

export default SearchProvider;
