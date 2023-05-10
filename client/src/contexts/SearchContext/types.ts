import { IMovie } from "../../components/MovieCard/types";

export interface ISearchContext {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	moviesFromSearch: IMovie[];
	setMoviesFromSearch: React.Dispatch<React.SetStateAction<IMovie[]>>;
	seriesFromSearch: IMovie[];
	setSeriesFromSearch: React.Dispatch<React.SetStateAction<IMovie[]>>;
}

export type SearchProviderProps = {
	children: React.ReactNode;
};
