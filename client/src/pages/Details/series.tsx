import * as S from "./styles";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import { Link } from "react-router-dom";
import { IMovieDetails } from "./types";
import Loading from "../../components/Loading";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { RiHeartFill } from "react-icons/ri";
import { IMovie } from "../../components/MovieCard/types";

const apiKey = process.env.REACT_APP_API_KEY;

export default function SeriesDetails() {
	const { favorites, handleFavorite } = useContext(FavoritesContext);
	const {
		moviesFromSearch,
		seriesFromSearch,
		setSeriesFromSearch,
		setMoviesFromSearch,
	} = useContext(SearchContext);

	const { id } = useParams<string>();
	const baseImageURL = "https://themoviedb.org/t/p/original";
	const [movie, setMovie] = useState<IMovieDetails>({} as IMovieDetails);
	const [fullDescription, setFullDescription] = useState(false);
	const [player, setPlayer] = useState(false);

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
						mainTrailer: data.videos.results[0]
							? data.videos.results[0].key
							: "",
						trailers: data.videos.results,
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
				<S.Container background={`${baseImageURL}/${movie.background}`}>
					<div className="fade"></div>
					<section className="card-container">
						<div className="container-info__top">
							<span>{movie.title}</span>
						</div>
						<img
							src={
								movie.poster_path
									? `${baseImageURL}/${movie.poster_path}`
									: "/img/movie_placeholder.jpg"
							}
							alt={`Capa do filme ${movie.title}`}
						/>
						<div className="container-info__bottom">
							<span>
								<RiHeartFill
									className={
										favorites.some((item) => {
											if (movie) {
												return item.id === movie.id;
											}
										})
											? "unfav-btn"
											: "fav-btn"
									}
									onClick={() => movie && handleFavorite(movie as IMovie)}
								/>
								Favoritar
							</span>
						</div>
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
									<h3>Séries relacionados</h3>
									<div className="related-movies">
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
									</div>
								</li>
								{movie.trailers && movie.trailers.length > 0 && (
									<li>
										<h3>Mais trailers</h3>
										<div className="related-movies">
											{movie.trailers.map(
												(item) =>
													item.type === "Trailer" && (
														<div
															key={item.key}
															className="related-movies__movie"
															onClick={() => {
																setMovie((prevState) => ({
																	...prevState,
																	mainTrailer: item.key,
																}));
																setPlayer(true);
															}}
														>
															<img
																src={
																	movie.poster_path
																		? `https://www.themoviedb.org/t/p/w154${movie.poster_path}`
																		: "/img/movie_placeholder.jpg"
																}
															/>
															{item.name && item.name.substring(0, 9) + "..."}
														</div>
													)
											)}
										</div>
									</li>
								)}
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
							src={`https://www.youtube.com/embed/${movie.mainTrailer}`}
							title="YouTube video player"
							allowFullScreen
						/>
					</S.IframeContainer>
				</S.Container>
			)}
		</>
	);
}
