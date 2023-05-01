import React from "react";
import Header from "../../components/Header";
import dataMovies from "../../api/freemovies_list.json";
import { Container } from "./styles";
import MovieCard from "../../components/MovieCard/";

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
							<MovieCard
								key={movie.imdb}
								id={movie.imdb}
								title={movie.title}
								vote_average={NaN}
								poster_path={movie.poster_path}
								free={movie.key}
							/>
						</a>
					))}
				</ul>
			</Container>
		</>
	);
}
