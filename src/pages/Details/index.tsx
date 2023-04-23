import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import * as S from "./styles";
import { SearchContext } from "../../contexts/SearchContext";
import { Wrapper } from "../Home/styles";
import { MovieList } from "../../components/MovieList";
import { Movie } from "../../components/MovieItem";
import { Link } from "react-router-dom";
import ListButton from "../../components/ListButton";
import { IListRefs, IMovie } from "./types";

const apiKey = process.env.REACT_APP_API_KEY;

export default function Details() {
	const {
		moviesFromSearch,
		seriesFromSearch,
		setSeriesFromSearch,
		setMoviesFromSearch,
	} = useContext(SearchContext);
	const { id } = useParams();
	const image_path = "https://themoviedb.org/t/p/original";
	const [movie, setMovie] = useState<IMovie>({} as IMovie);
	const [fullDescription, setFullDescription] = useState<boolean>(false);
	const [player, setPlayer] = useState<boolean>(false);

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

	useEffect(() => {
		window.scrollTo(0, 0);
		setMoviesFromSearch([]);
		setSeriesFromSearch([]);
		fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos&language=pt-BR`
		)
			.then((response) => response.json())
			.then((data) => {
				const movie: IMovie = {
					id,
					title: data.title,
					background: data.backdrop_path,
					poster_path: data.poster_path,
					sinopse: data.overview.substring(0, 49) + "...",
					fullSinopse: data.overview,
					trailer: data.videos.results[0] ? data.videos.results[0].key : "",
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
				};
				document.title = `Watchous - ${movie.title}`;
				setMovie(movie);
			})
			.catch((e) => console.log(e));
	}, [id]);

	return (
		<>
			{seriesFromSearch.length === 0 && moviesFromSearch.length === 0 && (
				<S.Container background={`${image_path}/${movie.background}`}>
					<div className="fade"></div>
					<section className="card-container">
						<div className="container-info__top">
							<strong>Data de lançamento:</strong>
							{movie.release}
						</div>
						<img
							src={`${image_path}/${movie.poster_path}`}
							alt={`Capa do filme ${movie.title}`}
						/>
						<div
							className="container-info__bottom"
							onClick={() => setPlayer(true)}
						>
							<button>
								<span>Ver trailer</span>
							</button>
						</div>
					</section>
					<section className="overview-container">
						<div className="container-info__top">
							<span>{movie.genres}</span>
						</div>
						<p>
							{fullDescription ? movie.fullSinopse : movie.sinopse}
							<button
								className="sinopse-btn"
								onClick={() => setFullDescription(!fullDescription)}
							>
								<span>{fullDescription ? "Ver menos" : "Ver mais"}</span>
							</button>
						</p>
						<div className="container-info__bottom">
							<span>Nota da audiencia:</span> {movie.vote_average}
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
