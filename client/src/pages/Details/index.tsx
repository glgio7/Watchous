import * as S from "./styles";
import Form from "../../components/Form";
import InputContainer from "../../components/InputForm";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { IMovieDetails } from "./types";
import { RiHeartFill } from "react-icons/ri";
import { IMovie } from "../../components/MovieCard/types";
import { addFreeMovie } from "../../api/freemovies/add-freemovies";
import { useFromSearch } from "../../hooks/useFromSearch";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../hooks/useAuth";

const apiKey = import.meta.env.VITE_APP_API_KEY;

export default function Details() {
	const { id } = useParams();
	const baseImageURL = "https://themoviedb.org/t/p/original";
	const [movie, setMovie] = useState<IMovieDetails>({} as IMovieDetails);
	const [fullDescription, setFullDescription] = useState<boolean>(false);
	const [player, setPlayer] = useState<boolean>(false);
	const [formOpen, setFormOpen] = useState<boolean>(false);
	const [loadingForm, setLoadingForm] = useState<boolean>(false);

	const { favorites, handleFavorite } = useFavorites();
	const { authenticated } = useAuth();
	const navigate = useNavigate();
	const fromSearch = useFromSearch();

	if (player || formOpen) {
		document.body.style.overflow = "hidden";
	} else if (!player || formOpen) {
		document.body.style.overflow = "auto";
	}

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [player]);

	useEffect(() => {
		window.scrollTo(0, 0);
		fromSearch.setMoviesFromSearch([]);
		fromSearch.setSeriesFromSearch([]);
		fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos,similar,images,reviews&language=pt-BR`
		)
			.then((response) => response.json())
			.then((data) => {
				const movie: IMovieDetails = {
					id,
					title: data.title,
					background: data.backdrop_path,
					poster_path: data.poster_path,
					sinopse: data.overview.substring(0, 49) + "...",
					fullSinopse: data.overview,
					mainTrailer: data.videos.results[0] ? data.videos.results[0].key : "",
					trailers: data.videos.results,
					release: data.release_date
						.split("-")
						.reverse()
						.join()
						.replaceAll(",", "/"),
					genres: data.genres
						.slice(0, 3)
						.map((value: { id: number; name: string }) => value.name)
						.join(" - "),
					vote_average: Math.round(data.vote_average),
					related: data.similar.results.slice(0, 10),
					youtubeUrl: "",
				};
				document.title = `Watchous - ${movie.title}`;
				setMovie(movie);
			})
			.catch((e) => console.log(e));
	}, [id]);

	const addYoutubeUrl = (url: string) => {
		setMovie((movie) => {
			return { ...movie, youtubeUrl: url };
		});
	};

	const handleAddFreeMovie = async (movie: IMovieDetails) => {
		if (movie.youtubeUrl) {
			setLoadingForm(true);
			await addFreeMovie(
				movie.id!,
				movie.title,
				movie.poster_path,
				movie.youtubeUrl
			);
			setLoadingForm(false);
			setFormOpen(false);
		} else return;
	};

	return (
		<>
			{!movie.genres && <Loading />}
			{fromSearch.seriesFromSearch.length === 0 &&
				fromSearch.moviesFromSearch.length === 0 && (
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
								<span onClick={() => movie && handleFavorite(movie as IMovie)}>
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
									/>
									Favoritar
								</span>
								<span
									onClick={() => {
										authenticated ? setFormOpen(true) : navigate("/login");
									}}
								>
									<img
										src="/assets/youtube-btn.svg"
										alt=""
										className={"fav-btn"}
									/>
									Adicionar link do Youtube
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
										<h3>Data de lançamento</h3>
										{movie.release}
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
										<h3>Filmes relacionados</h3>
										<div className="related-movies">
											{movie.related &&
												movie.related.map((movie) => (
													<Link
														to={`/details/${movie.id}`}
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
														{movie.title.substring(0, 9) + "..."}
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
						{/* Add movie form container */}
						{formOpen && (
							<S.FormContainer active={formOpen}>
								<button
									className="close-btn"
									onClick={() => setFormOpen(false)}
								>
									Fechar
								</button>
								<Form
									handler={() => handleAddFreeMovie(movie)}
									spanTip={[]}
									route={""}
									spanSubmit={"Adicionar"}
									loading={loadingForm}
								>
									<InputContainer
										label="Id"
										type="text"
										id="imdb"
										value={movie.id!}
										required
										readonly
									/>
									<InputContainer
										label="Titulo"
										type="text"
										id="title"
										value={movie.title!}
										required
										readonly
									/>
									<InputContainer
										label="Capa do Filme"
										type="text"
										id="imgUrl"
										value={movie.poster_path}
										required
										readonly
									/>
									<InputContainer
										label="Link do Youtube"
										type="text"
										id="youtubeUrl"
										value={movie.youtubeUrl || ""}
										onChange={(e) => addYoutubeUrl(e.target.value)}
										required
									/>
								</Form>
							</S.FormContainer>
						)}

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
