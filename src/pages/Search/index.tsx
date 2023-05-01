import * as S from "./styles";
import React, { useContext, useRef } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import Wrapper from "../../components/Wrapper";
import MovieList from "../../components/MovieList";
import ListButton from "../../components/ListButton";
import { handleScrollList } from "../../utils";
import { IListRefs } from "../../utils/types";
import MovieCard from "../../components/MovieCard";

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
						<MovieCard
							key={movie.id}
							id={movie.id}
							vote_average={movie.vote_average}
							title={movie.title}
							poster_path={movie.poster_path}
							onClick={() => setSearchValue("")}
						/>
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
						<MovieCard
							key={movie.id}
							id={movie.id}
							vote_average={movie.vote_average}
							name={movie.name}
							poster_path={movie.poster_path}
							onClick={() => setSearchValue("")}
						/>
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
