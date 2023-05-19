import { IMovie } from "../../../models/movie";
import { HttpRequest, HttpResponse } from "../../protocols";
import {
	IAddMovieController,
	IAddMovieParams,
	IAddMovieRepository,
} from "./protocols";

export class AddFreeMovieController implements IAddMovieController {
	constructor(private readonly addMovieRepository: IAddMovieRepository) {}

	async handle(
		httpRequest: HttpRequest<IAddMovieParams>
	): Promise<HttpResponse<IMovie>> {
		try {
			const requiredFields = ["title", "imdb", "youtubeUrl", "imgUrl"];

			for (const field of requiredFields) {
				if (!httpRequest.body?.[field as keyof IAddMovieParams]) {
					return {
						statusCode: 400,
						body: `${field} is a required field.`,
					};
				}
			}

			const movie = await this.addMovieRepository.addMovie(httpRequest.body!);

			return {
				statusCode: 200,
				body: movie,
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: `Bad request, ${error}`,
			};
		}
	}
}
