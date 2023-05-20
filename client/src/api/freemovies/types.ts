export interface IFreeMovie {
	_id?: string;
	imdb: string;
	title: string;
	imgUrl: string;
	youtubeUrl: string;
}

export type AddFreeMoviesProps = {
	imdb: string;
	title: string;
	imgUrl: string;
	youtubeUrl: string;
};
