import { IMovie } from "../../../models/movie";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface IAddMovieController {
	handle(
		HttpRequest: HttpRequest<IAddMovieParams>
	): Promise<HttpResponse<IMovie>>;
}

export interface IAddMovieParams {
	imdb: string;
	title: string;
	imgUrl: string;
	youtubeUrl: string;
}

export interface IAddMovieRepository {
	addMovie(params: IAddMovieParams): Promise<IMovie>;
}
