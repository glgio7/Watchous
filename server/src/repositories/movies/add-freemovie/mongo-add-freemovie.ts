import {
	IAddMovieParams,
	IAddMovieRepository,
} from "../../../controllers/movies/add-freemovie/protocols";
import { MongoClientMovies } from "../../../database/mongo";
import { IMovie } from "../../../models/movie";

export class MongoAddFreeMovieRepository implements IAddMovieRepository {
	async addMovie(params: IAddMovieParams): Promise<IMovie> {
		const { imdb } = params;

		const movieAlreadyAdded = await MongoClientMovies.db
			.collection("freemovies")
			.findOne({ imdb: imdb });

		if (movieAlreadyAdded) {
			throw new Error(`This movie is already added in this playlist.`);
		}

		const { insertedId } = await MongoClientMovies.db
			.collection("freemovies")
			.insertOne(params);

		const movie = await MongoClientMovies.db
			.collection<Omit<IMovie, "id">>("freemovies")
			.findOne({ _id: insertedId });

		if (!movie) {
			throw new Error("Something went wrong.");
		}

		return movie;
	}
}
