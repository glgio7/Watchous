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
	name?: string;
	title?: string;
	onClick?: () => void;
	free?: string;
	movie?: IMovie | IMovieFromDb;
	vote_average: number;
	id: string;
	poster_path: string;
};
