import * as S from "./styles";
import React, { useContext, useRef } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import Wrapper from "../../components/Wrapper";
import MovieList from "../../components/MovieList";
import ListButton from "../../components/ListButton";
import Movie from "../../components/MovieCard/styles";
import { handleScrollList } from "../../utils";
import { IListRefs } from "../../utils/types";
import { Link } from "react-router-dom";

const SearchContainer = () => {
	const { moviesFromSearch, seriesFromSearch, setSearchValue } = useContext(
		SearchContext
	);

	const listRefs: IListRefs = {
		searchMovies: useRef<HTMLUListElement>(null),
		searchSeries: useRef<HTMLUListElement>(null),
	};

	return (
		<S.SearchContainer>
			<h1>Filmes da sua pesquisa</h1>
			<Wrapper>
				<MovieList ref={listRefs["searchMovies"]}>
					<ListButton
						direction={"left"}
						onClick={() => handleScrollList(listRefs, "left", "searchMovies")}
					/>
					{moviesFromSearch.map((movie) => (
						<Movie key={movie.id} onClick={() => setSearchValue("")}>
							<div className="vote-average">
								<span>
									{Math.round(movie.vote_average) !== 0
										? Math.round(movie.vote_average)
										: "?"}
								</span>
								<p>
									{movie.vote_average > 8
										? "★★★★★"
										: movie.vote_average > 6
										? "★★★★"
										: movie.vote_average > 4
										? "★★★"
										: movie.vote_average > 2
										? "★★"
										: "★"}
								</p>
							</div>
							<Link to={`/details/${movie.id}`}>
								<img
									src={
										movie.poster_path
											? `https://www.themoviedb.org/t/p/w500${movie.poster_path}`
											: "/img/movie_placeholder.jpg"
									}
									alt={""}
									className="moviePoster"
								/>
							</Link>
							<span>{movie.title}</span>
						</Movie>
					))}
					<ListButton
						direction={"right"}
						onClick={() => handleScrollList(listRefs, "right", "searchMovies")}
					/>
				</MovieList>
			</Wrapper>
			<h1>Séries da sua pesquisa</h1>
			<Wrapper>
				<MovieList ref={listRefs["searchSeries"]}>
					<ListButton
						direction={"left"}
						onClick={() => handleScrollList(listRefs, "left", "searchSeries")}
					/>
					{seriesFromSearch.map((movie) => (
						<Movie key={movie.id} onClick={() => setSearchValue("")}>
							<div className="vote-average">
								<span>
									{Math.round(movie.vote_average) !== 0
										? Math.round(movie.vote_average)
										: "?"}
								</span>
								<p>
									{movie.vote_average > 8
										? "★★★★★"
										: movie.vote_average > 6
										? "★★★★"
										: movie.vote_average > 4
										? "★★★"
										: movie.vote_average > 2
										? "★★"
										: "★"}
								</p>
							</div>
							<Link to={`/details/series/${movie.id}`}>
								<img
									src={
										movie.poster_path
											? `https://www.themoviedb.org/t/p/w500${movie.poster_path}`
											: "/img/movie_placeholder.jpg"
									}
									alt={""}
									className="moviePoster"
								/>
							</Link>
							<span>{movie.name}</span>
						</Movie>
					))}
					<ListButton
						direction={"right"}
						onClick={() => handleScrollList(listRefs, "right", "searchSeries")}
					/>
				</MovieList>
			</Wrapper>
		</S.SearchContainer>
	);
};

export default SearchContainer;
