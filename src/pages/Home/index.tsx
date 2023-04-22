import * as S from "./styles";
import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Movie } from "../../components/movieitem";
import db from "../../api/movies_list.json";
import { RiCloseFill } from "react-icons/ri";
import ListButton from "../../components/ListButton";

interface IListRefs {
	[key: string]: React.RefObject<HTMLUListElement>;
}

export interface IMovie {
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
		thriller: useRef<HTMLUListElement>(null),
		horror: useRef<HTMLUListElement>(null),
		fantasy: useRef<HTMLUListElement>(null),
		drama: useRef<HTMLUListElement>(null),
		// series: useRef<HTMLUListElement>(null),
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

	const handleScrollList = (direction: string, list: string) => {
		let currentScroll = listRefs[list].current!.scrollLeft;
		let maxScroll =
			listRefs[list].current!.scrollWidth - listRefs[list].current!.clientWidth;

		if (
			maxScroll - currentScroll < 50 &&
			direction === "right" &&
			list === "upcoming"
		) {
			setPageUpcoming(pageUpcoming + 1);
			listRefs[list].current!.scrollLeft = 0;
		} else if (direction === "right") {
			listRefs[list].current!.scrollLeft += maxScroll / 3;
		} else if (direction === "left") {
			listRefs[list].current!.scrollLeft -= maxScroll / 3;
			if (pageUpcoming > 1 && currentScroll === 0 && list === "upcoming") {
				setPageUpcoming(pageUpcoming - 1);
			}
		}
	};

	return (
		<>
			<Header setSearchValue={setSearchValue} />
			<S.Banner>
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
			</S.Banner>
			<S.Container>
				{upcoming && upcoming.length > 5 && (
					<>
						<h1 onClick={() => console.log(listRefs["upcoming"].current)}>
							Novos no Watchous
						</h1>
						<S.Wrapper>
							<S.MovieList ref={listRefs.upcoming}>
								<ListButton
									direction={"left"}
									onClick={() => handleScrollList("left", "upcoming")}
								/>
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
								<ListButton
									direction={"right"}
									onClick={() => handleScrollList("right", "upcoming")}
								/>
							</S.MovieList>
						</S.Wrapper>
					</>
				)}
				{Object.entries(db).map((item) => (
					<div key={item[0]}>
						<h1>{item[0]}</h1>
						<S.Wrapper>
							<S.MovieList ref={listRefs[item[0]]}>
								<ListButton
									direction={"left"}
									onClick={() => handleScrollList("left", item[0])}
								/>
								{item[1].map((movie) => (
									<Movie key={movie.id}>
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
									onClick={() => handleScrollList("right", item[0])}
								/>
							</S.MovieList>
						</S.Wrapper>
					</div>
				))}
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
