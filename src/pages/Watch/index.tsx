import React from "react";
import Header from "../../components/Header";
import dataMovies from "../../api/freemovies_list.json";
import { Container } from "./styles";
import Movie from "../../components/MovieCard/styles";

export default function FreeToWatch() {
	return (
		<>
			<Container>
				<div className="fade"></div>
				<ul>
					{dataMovies.freemovies.map((movie) => (
						<a
							href={`https://youtube.com/watch?v=${movie.key}`}
							target="_blank"
							rel="noopener noreferrer"
							key={movie.imdb}
						>
							<Movie key={movie.imdb} className="movie-box">
								<img
									src={
										movie.poster_path
											? `https://www.themoviedb.org/t/p/w500${movie.poster_path}`
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
