// import React, { useEffect, useState } from "react";
// import Header from "../../components/Header";
// import { Link, useParams } from "react-router-dom";
// import { RiArrowLeftLine, RiCloseFill } from "react-icons/ri";
// import * as S from "../Home/styles";
// import { Movie } from "../../components/movieitem";
// import { Container } from "./styles";

// const apiKey = process.env.API_KEY;

// interface IMovie {
// 	name?: string;
// 	id?: string;
// 	key?: string;
// 	title: string;
// 	nota: number;
// 	fullSinopse: string;
// 	sinopse: string;
// 	poster_path: string;
// 	background: string;
// 	lastEpisode: string;
// 	genres: string;
// }

// export default function SeriesDetails() {
// 	const [valorDoFiltro, setValorDoFiltro] = useState("");
// 	const { id } = useParams<string>();
// 	const image_path = "https://themoviedb.org/t/p/original";
// 	const [movie, setMovie] = useState<IMovie>({} as IMovie);
// 	const [trailer, setTrailer] = useState({} as IMovie);
// 	const [fullDescription, setFullDescription] = useState(false);
// 	const [player, setPlayer] = useState(false);
// 	const [loaded, setLoaded] = useState(false);
// 	const goBack = () => window.history.back();
// 	const showFull = () => setFullDescription(!fullDescription);
// 	const Load = () => window.scrollTo(0, 0);
// 	const togglePlayer = () => {
// 		setPlayer(!player);
// 		Load();
// 	};

// 	useEffect(() => {
// 		fetch(
// 			`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`
// 		)
// 			.then((response) => response.json())
// 			.then((data) => {
// 				const movie: IMovie = {
// 					id,
// 					title: data.name,
// 					fullSinopse: data.overview,
// 					sinopse: data.overview.substring(0, 49) + "...",
// 					poster_path: data.poster_path,
// 					background: data.backdrop_path,
// 					lastEpisode: data.last_air_date
// 						.split("-")
// 						.reverse()
// 						.join()
// 						.replaceAll(",", "/"),
// 					genres: data.genres,
// 					// .slice(0, 3)
// 					// .map((value: []) => value.name)
// 					// .join(" / "),
// 					nota: Math.round(data.vote_average),
// 				};
// 				document.title = `Watchous - ${movie.title}`;
// 				setMovie(movie);
// 			})
// 			// .then(
// 			// 	fetch(
// 			// 		`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=en-US`
// 			// 	)
// 			// 		.then((response) => response.json())
// 			// 		.then((data) => {
// 			// 			const trailer: IMovie = {
// 			// 				id,
// 			// 				key:
// 			// 					data.results.length > 0
// 			// 						? data.results.filter(
// 			// 								(value: IMovie) => (value.name = "Official Trailer")
// 			// 						  )[data.results.length - 1].key
// 			// 						: null,
// 			// 				title: "",
// 			// 				nota: 0,
// 			// 				fullSinopse: "",
// 			// 				sinopse: "",
// 			// 				poster_path: "",
// 			// 				background: "",
// 			// 				lastEpisode: "",
// 			// 				genres: "",
// 			// 			};
// 			// 			setTrailer(trailer);
// 			// 		})
// 			// 		.then(() => {
// 			// 			setPlayer(false);
// 			// 			setFullDescription(false);
// 			// 			setTimeout(() => {
// 			// 				setLoaded(true);
// 			// 			}, 500);
// 			// 		})
// 			// )
// 			.catch((e) => console.log(e));
// 	}, [id]);
// 	///////////////////////////////////////////////////////////////////////FROM SEARCH
// 	const [fromSearch, setFromSearch] = useState<[] | null>([]);
// 	const serverSearch = valorDoFiltro.replaceAll(" ", "+");

// 	console.log(movie);

// 	useEffect(() => {
// 		fetch(
// 			`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${serverSearch}&language=pt-BR`
// 		)
// 			.then((response) => response.json())
// 			.then((data) => {
// 				setFromSearch(data.results);
// 			});
// 	}, [serverSearch]);

// 	return (
// 		<>
// 			<Header
// 				// valorDoFiltro={valorDoFiltro}
// 				setSearchValue={setValorDoFiltro}
// 			/>
// 			<Container onLoad={Load}>
// 				{fromSearch && (
// 					<>
// 						<S.MovieList className="search-results">
// 							{fromSearch.map((movie: IMovie) => (
// 								<Movie
// 									key={movie.id}
// 									onClick={() => {
// 										setFromSearch(null);
// 										setLoaded(false);
// 										setValorDoFiltro("");
// 									}}
// 								>
// 									<Link to={`/details/serie/${movie.id}`}>
// 										<img
// 											src={
// 												movie.poster_path
// 													? `https://www.themoviedb.org/t/p/w500${movie.poster_path}`
// 													: "img/movie_placeholder.jpg"
// 											}
// 											alt={""}
// 											className="moviePoster"
// 										/>
// 									</Link>
// 									<span>{movie.name}</span>
// 								</Movie>
// 							))}
// 						</S.MovieList>
// 					</>
// 				)}
// 				{loaded === false && (
// 					<div className="loading">
// 						<img src="/img/loading.gif" alt="Loading" />
// 					</div>
// 				)}
// 				<section>
// 					<img
// 						className="background"
// 						src={
// 							movie.background
// 								? `${image_path}${movie.background}`
// 								: "/img/tmdb.jpg"
// 						}
// 						alt=""
// 					/>
// 					<div className="fade"></div>
// 					{trailer.key && (
// 						<>
// 							<iframe
// 								key={id}
// 								title={movie.title}
// 								className={player ? "active" : ""}
// 								src={`https://www.youtube.com/embed/${trailer.key}`}
// 								allowFullScreen
// 							></iframe>
// 							<RiCloseFill
// 								className={player ? "close-player active" : "close-player"}
// 								onClick={togglePlayer}
// 							/>
// 						</>
// 					)}
// 					{!trailer.key && (
// 						<>
// 							<img
// 								src="/img/unavailable.jpg"
// 								className={
// 									player ? "video-unavailable active" : "video-unavailable"
// 								}
// 								alt=""
// 							/>
// 							<RiCloseFill
// 								className={player ? "close-player active" : "close-player"}
// 								onClick={togglePlayer}
// 							/>
// 						</>
// 					)}
// 					<div className="container">
// 						<div className="release-date">
// 							<h1>Último episódio lançado: </h1>
// 							{movie.lastEpisode}
// 						</div>
// 						<img
// 							className="poster"
// 							src={
// 								movie.poster_path
// 									? `${image_path}${movie.poster_path}`
// 									: "https://media0.giphy.com/media/3osxYzUOBRWEg5S5q0/giphy.gif"
// 							}
// 							alt=""
// 						/>
// 						<button onClick={togglePlayer}>Assistir Trailer</button>
// 						<RiArrowLeftLine className="back" onClick={goBack} />
// 					</div>
// 					<div className="overview">
// 						<div className="infos">{movie.genres}</div>
// 						<h1>{movie.title}</h1>
// 						<p>{fullDescription ? movie.fullSinopse : movie.sinopse}</p>
// 						<p onClick={showFull} id="expand-overview">
// 							{fullDescription ? "Ver menos" : "Ver mais"}
// 						</p>
// 						<div className="infos" id="nota">
// 							<span>Nota da audiência:</span>
// 							<span>{movie.nota}/10</span>
// 						</div>
// 					</div>
// 				</section>
// 			</Container>
// 		</>
// 	);
// }
