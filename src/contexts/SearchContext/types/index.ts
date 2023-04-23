export interface IMovie {
	id: string;
	vote_average: number;
	poster_path: string;
	title: string;
	name?: string;
}

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
