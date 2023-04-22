import React from "react";
import Header from "../../components/Header";
import * as S from "./styles";

export default function Credits() {
	return (
		<>
			<Header />
			<S.Container>
				<h1>Desenvolvedor</h1>
				<a href="https://github.com/glgio7">
					<img src="/img/github-logo.png" alt="" />
				</a>
				<p>
					O Watchous foi desenvolvido com React.js por Giovane Lucas -
					Desenvolvedor Full Stack com foco em Front-End
				</p>
				<p>
					Você pode conferir os arquivos desse e de outros projetos clicando{" "}
					<a href="https://github.com/glgio7">aqui</a>.
				</p>
				<h1>Filmes e séries</h1>
				<p>
					Todos os dados como gêneros, avaliações, trailers, capas e posters de
					fundo foram fornecidos por TMDB.
				</p>
				<p>
					Acesse a API do TMDB clicando na imagem abaixo caso tenha interesse em
					desenvolver seu aplicativo também.
				</p>
				<a href="https://developers.themoviedb.org">
					<img src="/img/tmdb.svg" alt="" />
				</a>
			</S.Container>
		</>
	);
}
