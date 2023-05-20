import * as S from "./styles";
import React from "react";
import Wrapper from "../../components/Wrapper";
import MovieList from "../../components/MovieList/";
import { useFromSearch } from "../../hooks/useFromSearch";

const SearchContainer = () => {
	const { moviesFromSearch, seriesFromSearch } = useFromSearch();

	return (
		<S.SearchContainer>
			<h1>Filmes da sua pesquisa</h1>
			<Wrapper>
				<MovieList list={moviesFromSearch} />
			</Wrapper>
			<h1>Séries da sua pesquisa</h1>
			<Wrapper>
				<MovieList list={seriesFromSearch} />
			</Wrapper>
		</S.SearchContainer>
	);
};

export default SearchContainer;
