export interface IMovie {
	name?: string;
	release?: string;
	trailer?: string;
	lastEpisode?: string;
	id: string;
	title: string;
	vote_average: number;
	fullSinopse: string;
	sinopse: string;
	poster_path: string;
	background: string;
	genres: string;
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
