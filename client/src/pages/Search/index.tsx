import * as S from "./styles";
import React, { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import Wrapper from "../../components/Wrapper";
import MovieList from "../../components/MovieList/";

const SearchContainer = () => {
	const { moviesFromSearch, seriesFromSearch } = useContext(SearchContext);

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
