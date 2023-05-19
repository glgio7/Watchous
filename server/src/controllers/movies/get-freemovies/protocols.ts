import { IMovie } from "../../../models/movie";
import { HttpResponse } from "../../protocols";

export interface IGetFreeMoviesController {
	handle(): Promise<HttpResponse<IMovie[]>>;
}
export interface IGetFreeMoviesRepository {
	getMovies(): Promise<IMovie[]>;
}
