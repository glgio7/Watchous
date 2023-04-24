import React from "react";
import Header from "../../components/Header";
import dataMovies from "../../api/freemovies_list.json";
import { Container } from "./styles";
import { Movie } from "../../components/MovieItem";

export default function FreeToWatch() {
	return (
		<>
			<Container>
				<ul>
					{dataMovies.freemovies.map((movie) => (
						<a
							href={`https://youtube.com/watch?v=${movie.key}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Movie key={movie.imdb} className="movie-box">
								<img
									src={
										movie.image_path
											? `https://www.themoviedb.org/t/p/w500${movie.image_path}`
											: "/img/movie_placeholder.jpg"
									}
									alt={""}
									className="moviePoster"
								/>
								<button>Assistir agora</button>
							</Movie>
						</a>
					))}
				</ul>
			</Container>
		</>
	);
}
