export interface IMovie {
	name?: string;
	vote_average: number;
	id: string;
	title: string;
	poster_path: string;
}

export interface IMovieFromDb {
	name?: string;
	title?: string;
	vote_average?: number | any;
	id: string;
	poster_path: string;
}
