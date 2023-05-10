export interface IMovieDetails {
	name?: string;
	id?: string;
	trailers?: [{ key: string; name: string; type: string }];
	mainTrailer?: string;
	lastEpisode?: string;
	release: string;
	related: IMovieDetails[];
	title: string;
	vote_average: number;
	fullSinopse: string;
	sinopse: string;
	poster_path: string;
	background: string;
	genres: string;
}

export interface IListRefs {
	[key: string]: React.RefObject<HTMLUListElement>;
}
