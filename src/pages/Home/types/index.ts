export interface IListRefs {
	[key: string]: React.RefObject<HTMLUListElement>;
}

export interface IMovie {
	name?: string;
	id: string;
	title: string;
	vote_average: number;
	poster_path: string;
}
