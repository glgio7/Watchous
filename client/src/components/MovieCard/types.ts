export interface IMovie {
	name?: string;
	title?: string;
	vote_average?: number;
	id: string;
	poster_path: string;
}

export interface IMovieFromDb {
	name?: string;
	title?: string;
	vote_average?: number | any;
	id: string;
	poster_path: string;
}

export type MovieCardProps = {
	id: string;
	poster_path: string;
	vote_average: number;
	title: string;
	free?: string;
	name?: string;
	movie?: IMovie | IMovieFromDb;
};
