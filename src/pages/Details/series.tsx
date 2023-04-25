import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import * as S from "./styles";
import { SearchContext } from "../../contexts/SearchContext";
import { Wrapper } from "../Home/styles";
import { MovieList } from "../../components/MovieList";
import ListButton from "../../components/ListButton";
import { Movie } from "../../components/MovieItem";
import { Link } from "react-router-dom";
import { IMovieDetails } from "./types";
import Loading from "../../components/Loading";

const apiKey = process.env.REACT_APP_API_KEY;

interface IListRefs {
	[key: string]: React.RefObject<HTMLUListElement>;
}

export default function SeriesDetails() {
	const {
		moviesFromSearch,
		seriesFromSearch,
		setSeriesFromSearch,
		setMoviesFromSearch,
	} = useContext(SearchContext);
	const { id } = useParams<string>();
	const image_path = "https://themoviedb.org/t/p/original";
	const [movie, setMovie] = useState<IMovieDetails>({} as IMovieDetails);
	const [fullDescription, setFullDescription] = useState(false);
	const [player, setPlayer] = useState(false);

	const listRefs: IListRefs = {
		searchMovies: useRef<HTMLUListElement>(null),
		searchSeries: useRef<HTMLUListElement>(null),
	};

	const handleScrollList = (direction: string, list: string) => {
		let maxScroll =
			listRefs[list].current!.scrollWidth - listRefs[list].current!.clientWidth;

		switch (direction) {
			case "left":
				listRefs[list].current!.scrollLeft -= maxScroll / 3;
				break;
			case "right":
				listRefs[list].current!.scrollLeft += maxScroll / 3;
				break;
		}
	};

	if (player) {
		document.body.style.overflow = "hidden";
	} else if (!player) {
		document.body.style.overflow = "auto";
	}

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [player]);

	useEffect(() => {
		window.scrollTo(0, 0);
		setMoviesFromSearch([]);
		setSeriesFromSearch([]);

		const infos = () => {
			fetch(
				`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&append_to_response=videos,images,similar&language=pt-BR`
			)
				.then((response) => response.json())
				.then((data) => {
					const movie: IMovieDetails = {
						id,
						title: data.name,
						fullSinopse: data.overview,
						sinopse: data.overview.substring(0, 49) + "...",
						poster_path: data.poster_path,
						background: data.backdrop_path,
						lastEpisode: data.last_air_date
							.split("-")
							.reverse()
							.join()
							.replaceAll(",", "/"),
						genres: data.genres
							.slice(0, 3)
							.map((value: { id: number; name: string }) => value.name)
							.join(" - "),
						vote_average: Math.round(data.vote_average),
						trailer: data.videos.results[0] ? data.videos.results[0].key : "",
						related: data.similar.results.slice(0, 10),
						release: data.first_air_date
							.split("-")
							.reverse()
							.join()
							.replaceAll(",", "/"),
					};
					document.title = `Watchous - ${movie.title}`;
					setMovie(movie);
				})
				.catch((e) => console.log(e));
		};

		Promise.all([infos()]);
	}, [id]);

	return (
		<>
			{!movie.genres && <Loading />}
			{seriesFromSearch.length === 0 && moviesFromSearch.length === 0 && (
				<S.Container background={`${image_path}/${movie.background}`}>
					<div className="fade"></div>
					<section className="card-container">
						<div className="container-info__top">
							<span>{movie.title}</span>
						</div>
						<img
							src={
								movie.poster_path
									? `${image_path}/${movie.poster_path}`
									: "/img/movie_placeholder.jpg"
							}
							alt={`Capa do filme ${movie.title}`}
						/>
						<div className="container-info__bottom">Série</div>
					</section>
					<section className="overview-container">
						<div className="container-info__top">
							<span>Descrição</span>
						</div>
						<div className="overview-body">
							<p>
								{fullDescription ? movie.fullSinopse : movie.sinopse}
								<button
									className="sinopse-btn"
									onClick={() => setFullDescription(!fullDescription)}
								>
									<span>{fullDescription ? "Ver menos" : "Ver mais"}</span>
								</button>
							</p>
							<ul className="overview-list">
								<li>
									<h3>Estréia</h3>
									{movie.release}
								</li>
								<li>
									<h3>Ultimo episódio lançado</h3>
									{movie.lastEpisode}
								</li>
								<li>
									<h3>Gênero</h3>
									{movie.genres}
								</li>
								<li>
									<h3>Nota da audiencia</h3>
									{movie.vote_average !== 0
										? movie.vote_average
										: "Não avaliado."}
								</li>
								<li>
									<h3>Séries relacionadas</h3>
									{movie.related &&
										movie.related.map((movie) => (
											<Link
												to={`/details/series/${movie.id}`}
												key={movie.id}
												className="related-movies__movie"
											>
												<img
													src={
														movie.poster_path
															? `https://www.themoviedb.org/t/p/w154${movie.poster_path}`
															: "/img/movie_placeholder.jpg"
													}
												/>
												{movie.name && movie.name.substring(0, 9) + "..."}
											</Link>
										))}
								</li>
							</ul>
						</div>
						<div
							className="container-info__bottom"
							onClick={() => setPlayer(true)}
						>
							<button>Ver trailer</button>
						</div>
					</section>

					{/* Trailer visualizer */}

					<S.IframeContainer active={player}>
						<button className="close-btn" onClick={() => setPlayer(false)}>
							Fechar
						</button>
						<iframe
							src={`https://www.youtube.com/embed/${movie.trailer}`}
							title="YouTube video player"
							allowFullScreen
						/>
					</S.IframeContainer>
				</S.Container>
			)}

			{/* ----------------------- Movies & Series from search / Results --------------------------- */}

			{moviesFromSearch.length > 0 && (
				<>
					<h1>Filmes da sua pesquisa</h1>
					<Wrapper>
						<MovieList ref={listRefs["searchMovies"]}>
							<ListButton
								direction={"left"}
								onClick={() => handleScrollList("left", "searchMovies")}
							/>
							{moviesFromSearch.map((movie) => (
								<Movie key={movie.id}>
									<div className="vote-average">
										<span>{movie.vote_average}</span>
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
								onClick={() => handleScrollList("right", "searchMovies")}
							/>
						</MovieList>
					</Wrapper>
				</>
			)}

			{seriesFromSearch.length > 0 && (
				<>
					<h1>Séries da sua pesquisa</h1>
					<Wrapper>
						<MovieList ref={listRefs["searchSeries"]}>
							<ListButton
								direction={"left"}
								onClick={() => handleScrollList("left", "searchSeries")}
							/>
							{seriesFromSearch.map((movie) => (
								<Movie key={movie.id}>
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
								onClick={() => handleScrollList("right", "searchSeries")}
							/>
						</MovieList>
					</Wrapper>
				</>
			)}
		</>
	);
}
