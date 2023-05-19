import { IGetFreeMoviesRepository } from "../../../controllers/movies/get-freemovies/protocols";
import { MongoClientMovies } from "../../../database/mongo";
import { IMovie } from "../../../models/movie";

export class MongoGetFreeMoviesRepository implements IGetFreeMoviesRepository {
	async getMovies(): Promise<IMovie[]> {
		const movies = await MongoClientMovies.db
			.collection<Omit<IMovie, "id">>("freemovies")
			.find({})
			.toArray();

		return movies;
	}
}
