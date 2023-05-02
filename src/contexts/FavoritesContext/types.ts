import { SetStateAction } from "react";
import { IMovie } from "../../components/MovieCard/types";

export type FavoriteProviderProps = {
	children: React.ReactNode;
};

export interface IFavoritesContext {
	favorites: IMovie[];
	setFavorites: React.Dispatch<SetStateAction<IMovie[]>>;
	handleFavorite: (movie: IMovie) => void;
	saveFavorites: (movie: IMovie[]) => void;
}
