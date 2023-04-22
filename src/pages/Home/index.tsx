import * as S from "./styles";
import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Movie } from "../../components/movieitem";

import { RiCloseFill } from "react-icons/ri";
import ListButton from "../../components/ListButton";

interface IListRefs {
	[key: string]: React.RefObject<HTMLUListElement>;
}

interface IMovie {
	id: string;
	vote_average: number;
	poster_path: string;
	title: string;
}

export default function Home() {
	const apiKey = process.env.REACT_APP_API_KEY;
	const [disclaimer, setDisclaimer] = useState(false);
	const handleDisclaimer = () => setDisclaimer(!disclaimer);

	const [searchValue, setSearchValue] = useState<string>("");
	const [pageUpcoming, setPageUpcoming] = useState(1);
	const [pageSeries, setPageSeries] = useState(1);
	const [upcoming, setUpcoming] = useState<IMovie[]>();
	const [series, setSeries] = useState([]);
	const [fromSearch, setFromSearch] = useState(null);
	const [seriesFromSearch, setSeriesFromSearch] = useState(null);
	const search = searchValue.replaceAll(" ", "+");

	const listRefs: IListRefs = {
		upcoming: useRef<HTMLUListElement>(null),
		searchMovies: useRef<HTMLUListElement>(null),
		searchSeries: useRef<HTMLUListElement>(null),
		suspense: useRef<HTMLUListElement>(null),
		horror: useRef<HTMLUListElement>(null),
		fantasy: useRef<HTMLUListElement>(null),
		drama: useRef<HTMLUListElement>(null),
		series: useRef<HTMLUListElement>(null),
	};

	//////////////////// upcoming
	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR&page=${pageUpcoming}`
		)
			.then((response) => response.json())
			.then((data) => {
				setUpcoming(data.results);
			})
			.catch((err) => console.log(err));
	}, [pageUpcoming]);
	//////////////////// series
	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=pt-BR&page=${pageSeries}`
		)
			.then((response) => response.json())
			.then((data) => setSeries(data.results))
			.catch((err) => console.log(err));
	}, [pageSeries]);

	//////////////////// search
	useEffect(() => {
		const movies = () => {
			fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&language=pt-BR`
			)
				.then((response) => response.json())
				.then((data) => setFromSearch(data.results))
				.catch((err) => console.log(err));
		};

		const series = () => {
			fetch(
				`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${search}&language=pt-BR`
			)
				.then((response) => response.json())
				.then((data) => setSeriesFromSearch(data.results))
				.catch((err) => console.log(err));
		};
		Promise.all([movies(), series()]);
	}, [search]);

	const checkStars = (value: IMovie) =>
		value.vote_average > 8
			? "★★★★★"
			: value.vote_average > 6
			? "★★★★"
			: value.vote_average > 4
			? "★★★"
			: value.vote_average > 2
			? "★★"
			: "★";

	return (
		<>
			<Header setSearchValue={setSearchValue} />
			<S.Container>
				<div className="banner">
					<h2>
						<span>Sem</span> assinatura, <span>sem</span> fins-lucrativos.
					</h2>
					<h1>Atualizações semanais</h1>
					<h2>
						<span>Confira</span> antes de assistir.
					</h2>
					<video autoPlay loop muted>
						<source src="/img/aurora.mp4" type="video/mp4" />
					</video>
				</div>
				<h1 onClick={() => console.log(listRefs["upcoming"].current)}>
					Novos no Watchous
				</h1>
				<div className="wrapper">
					<ListButton direction={"left"} />
					<S.MovieList ref={listRefs.upcoming}>
						{upcoming &&
							upcoming.map((movie) => (
								<Movie key={movie.id}>
									<div className="vote-average">
										<span>{movie.vote_average}</span>
										<p>{checkStars(movie)}</p>
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
					</S.MovieList>
					<ListButton direction={"right"} />
				</div>

				{/* Testing here above */}

				{/* 
						<h1>Suspense</h1>
						<div className="wrapper">
						<RiArrowLeftSLine
						className="move-left"
						onClick={() => handleDirection("suspense", "left")}
							/>
							<MovieList ref={listRefs.suspense}>
								{dataMovies.suspense.map((movie) => (
									<Movie key={movie.imdb}>
										<Link to={`/details/${movie.imdb}`}>
											<img
												src={`https://www.themoviedb.org/t/p/w500${movie.image_path}`}
												alt={""}
												className="moviePoster"
											/>
										</Link>
										<span>{movie.title}</span>
									</Movie>
								))}
							</MovieList>
							<RiArrowRightSLine
								className="move-right"
								onClick={() => handleDirection("suspense", "right")}
							/>
						</div>
						<h1>Terror</h1>
						<div className="wrapper">
							<RiArrowLeftSLine
								className="move-left"
								onClick={() => handleDirection("horror", "left")}
							/>
							<MovieList ref={listRefs.horror}>
								{dataMovies.terror.map((movie) => (
									<Movie key={movie.imdb}>
										<Link to={`/details/${movie.imdb}`}>
											<img
												src={`https://www.themoviedb.org/t/p/w500${movie.image_path}`}
												alt={""}
												className="moviePoster"
											/>
										</Link>
										<span>{movie.title}</span>
									</Movie>
								))}
							</MovieList>
							<RiArrowRightSLine
								className="move-right"
								onClick={() => handleDirection("horror", "right")}
							/>
						</div>
						<h1>Ficção / Fantasia</h1>
						<div className="wrapper">
							<RiArrowLeftSLine
								className="move-left"
								onClick={() => handleDirection("fantasy", "left")}
							/>
							<MovieList ref={listRefs.fantasy}>
								{dataMovies.fantasy.map((movie) => (
									<Movie key={movie.imdb}>
										<Link to={`/details/${movie.imdb}`}>
											<img
												src={`https://www.themoviedb.org/t/p/w500${movie.image_path}`}
												alt={""}
												className="moviePoster"
											/>
										</Link>
										<span>{movie.title}</span>
									</Movie>
								))}
							</MovieList>
							<RiArrowRightSLine
								className="move-right"
								onClick={() => handleDirection("fantasy", "right")}
							/>
						</div>
						<h1>Drama</h1>
						<div className="wrapper">
							<RiArrowLeftSLine
								className="move-left"
								onClick={() => handleDirection("drama", "left")}
							/>
							<MovieList ref={listRefs.drama}>
								{dataMovies.drama.map((movie) => (
									<Movie key={movie.imdb}>
										<Link to={`/details/${movie.imdb}`}>
											<img
												src={`https://www.themoviedb.org/t/p/w500${movie.image_path}`}
												alt={""}
												className="moviePoster"
											/>
										</Link>
										<span>{movie.title}</span>
									</Movie>
								))}
							</MovieList>
							<RiArrowRightSLine
								className="move-right"
								onClick={() => handleDirection("drama", "right")}
							/>
						</div>
						<h1>Séries</h1>
						<div className="wrapper">
							<RiArrowLeftSLine
								className="move-left"
								onClick={() => {
									handleDirection("series", "left");
									if (pageSeries > 1) setPageSeries(pageSeries - 1);
								}}
							/>
							<MovieList ref={listRefs.series}>
								<PreviousPage
									backPage={() => {
										if (pageSeries > 1) setPageSeries(pageSeries - 1);
									}}
								/>
								{series.map((movie) => (
									<Movie key={movie.id}>
										<Link to={`/details/serie/${movie.id}`}>
											<div className="vote-average">
												<span>{movie.vote_average}</span>
												<p>{checkStars(movie)}</p>
											</div>
											<img
												src={`https://www.themoviedb.org/t/p/w500${movie.poster_path}`}
												alt={""}
												className="moviePoster"
											/>
										</Link>
										<span>{movie.name}</span>
									</Movie>
								))}
								<NextPage loadMore={() => loadMoreSeries(true)} />
							</MovieList>
							<RiArrowRightSLine
								className="move-right"
								onClick={() => {
									handleDirection("series", "right");
									loadMoreSeries();
								}}
							/>
						</div> */}
				{/* ----------------------- Disclaimer/Advices --------------------------- */}
				<div className={disclaimer ? "disclaimer active" : "disclaimer"}>
					<RiCloseFill className="closeDisclaimer" onClick={handleDisclaimer} />
					<h2>Novidade: lista de filmes gratuitos do Youtube.</h2>
					<h2>Em breve: cadastro e lista de interesse.</h2>
				</div>
				<button className="buttonDisclaimer" onClick={handleDisclaimer}>
					?
				</button>
			</S.Container>
		</>
	);
}
