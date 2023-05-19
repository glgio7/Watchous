import {
	IGetFreeMoviesController,
	IGetFreeMoviesRepository,
} from "./protocols";

export class GetFreeMoviesController implements IGetFreeMoviesController {
	constructor(
		private readonly getFreeMoviesRepository: IGetFreeMoviesRepository
	) {}

	async handle() {
		try {
			const movies = await this.getFreeMoviesRepository.getMovies();
			return {
				statusCode: 200,
				body: movies,
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: `Something pizza!`,
			};
		}
	}
}
