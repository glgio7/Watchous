export interface IListRefs {
	[key: string]: React.RefObject<HTMLUListElement>;
}

export interface IMovie {
	name?: string;
	id?: string;
	release?: string;
	trailer?: string;
	lastEpisode?: string;
	title: string;
	vote_average: number;
	fullSinopse: string;
	sinopse: string;
	poster_path: string;
	background: string;
	genres: string;
}
