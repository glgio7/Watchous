import React, { createContext, useEffect, useState } from "react";
import { FavoriteProviderProps, IFavoritesContext } from "./types";
import { IMovieFromDb, IMovie } from "../../components/MovieCard/types";

export const FavoritesContext = createContext<IFavoritesContext>(
	{} as IFavoritesContext
);

const FavoritesProvider = ({ children }: FavoriteProviderProps) => {
	const [favorites, setFavorites] = useState<IMovie[]>([]);

	const saveFavorites = (value: IMovie[]) =>
		localStorage.setItem("savedFavorites", JSON.stringify(value));

	useEffect(() => {
		const fromLocal = localStorage.getItem("savedFavorites");
		const savedFavorites = fromLocal && JSON.parse(fromLocal);
		if (savedFavorites) {
			setFavorites(savedFavorites);
		}
	}, []);

	const handleFavorite = (movie: IMovie | IMovieFromDb) => {
		if (favorites.filter((item) => item.id === movie.id).length < 1) {
			const newFavorite = {
				title: movie.title,
				name: movie.name,
				poster_path: movie.poster_path,
				id: movie.id,
				vote_average: movie.vote_average,
			};
			setFavorites([...favorites, newFavorite]);
			saveFavorites([...favorites, newFavorite]);
		} else {
			const removedFavorite = {
				id: movie.id,
			};

			const newList = favorites.filter(
				(item) => item.id !== removedFavorite.id
			);

			setFavorites(newList);
			saveFavorites(newList);
		}
	};

	const contextValues = {
		favorites,
		setFavorites,
		handleFavorite,
		saveFavorites,
	};
	return (
		<FavoritesContext.Provider value={contextValues}>
			{children}
		</FavoritesContext.Provider>
	);
};

export default FavoritesProvider;
