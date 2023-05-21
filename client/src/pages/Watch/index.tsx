import { useEffect, useState } from "react";
import { Container } from "./styles";
import MovieCard from "../../components/MovieCard/";
import { getFreeMovies } from "../../api/freemovies/get-freemovies";
import { IFreeMovie } from "../../api/freemovies/types";

export default function FreeToWatch() {
	const [moviesList, setMoviesList] = useState<IFreeMovie[]>([]);

	useEffect(() => {
		getFreeMovies().then((movies) => {
			movies ? setMoviesList(movies) : setMoviesList([]);
		});
	}, []);

	return (
		<>
			<Container>
				<div className="fade"></div>
				<ul>
					{moviesList.map((movie) => (
						<a
							href={movie.youtubeUrl}
							target="_blank"
							rel="noopener noreferrer"
							key={movie.imdb}
						>
							<MovieCard
								key={movie.imdb}
								id={movie.imdb}
								title={movie.title}
								vote_average={0}
								poster_path={movie.imgUrl}
								free={movie.youtubeUrl}
							/>
						</a>
					))}
				</ul>
			</Container>
		</>
	);
}
