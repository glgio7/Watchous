import * as S from "./styles";
import db from "../../api/movies_list.json";
import React, { useState, useRef, useEffect, useContext } from "react";
import { IMovie } from "./types";
import { SearchContext } from "../../contexts/SearchContext";
import { Link } from "react-router-dom";
import ListButton from "../../components/ListButton";
import { MovieList } from "../../components/MovieList";
import { Movie } from "../../components/MovieItem";
import { RiCloseFill } from "react-icons/ri";
import Loading from "../../components/Loading";
import { IListRefs } from "../../utils/types";
import { handleScrollList } from "../../utils";
import SearchContainer from "../Search";

export default function Home() {
	const apiKey = process.env.REACT_APP_API_KEY;

	const { seriesFromSearch, moviesFromSearch } = useContext(SearchContext);

	const [disclaimer, setDisclaimer] = useState(false);
	const handleDisclaimer = () => setDisclaimer(!disclaimer);

	const [upcomingPage, setUpcomingPage] = useState(1);
	const [seriesPage, setSeriesPage] = useState(1);
	const [upcoming, setUpcoming] = useState<IMovie[]>([]);
	const [series, setSeries] = useState<IMovie[]>([]);

	const listRefs: IListRefs = {
		upcoming: useRef<HTMLUListElement>(null),
		series: useRef<HTMLUListElement>(null),
		searchMovies: useRef<HTMLUListElement>(null),
		searchSeries: useRef<HTMLUListElement>(null),
		thriller: useRef<HTMLUListElement>(null),
		horror: useRef<HTMLUListElement>(null),
		fantasy: useRef<HTMLUListElement>(null),
		drama: useRef<HTMLUListElement>(null),
	};

	//////////////////// upcoming
	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR&page=${upcomingPage}`
		)
			.then((response) => response.json())
			.then((data) => {
				setUpcoming(data.results);
			})
			.catch((err) => console.log(err));
	}, [upcomingPage]);
	//////////////////// series
	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR&page=${seriesPage}`
		)
			.then((response) => response.json())
			.then((data) => {
				setSeries(data.results);
			})
			.catch((err) => console.log(err));
	}, [seriesPage]);

	const handlePageList = (direction: string, list: string) => {
		const maxScroll =
			listRefs[list].current!.scrollWidth - listRefs[list].current!.clientWidth;

		let scrollRemaining = maxScroll - listRefs[list].current!.scrollLeft;

		if (scrollRemaining < 50 && direction === "right") {
			switch (list) {
				case "upcoming":
					setUpcomingPage((prevState) => prevState + 1);
					break;
				case "series":
					setSeriesPage((prevState) => prevState + 1);
					break;
			}
			listRefs[list].current!.scrollLeft = 0;
		} else if (scrollRemaining === maxScroll && direction === "left") {
			switch (list) {
				case "upcoming":
					if (upcomingPage > 1) {
						setUpcomingPage((prevState) => prevState - 1);
					}
					break;
				case "series":
					if (seriesPage > 1) {
						setSeriesPage((prevState) => prevState - 1);
					}
					break;
			}
		}
	};

	return (
		<>
			{upcoming.length < 5 && <Loading />}

			{moviesFromSearch.length < 1 && (
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
			)}

			<S.Container>
				{/* ----------------------- Movies & Series / Recommended --------------------------- */}

				{moviesFromSearch.length < 1 && seriesFromSearch.length < 1 && (
					<>
						{upcoming.length > 5 && (
							<>
								<h1>Novos no Watchous</h1>
								<S.Wrapper>
									<MovieList ref={listRefs.upcoming}>
										<ListButton
											direction={"left"}
											onClick={() => {
												handleScrollList(listRefs, "left", "upcoming");
												handlePageList("left", "upcoming");
											}}
										/>
										{upcoming.map((movie) => (
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
																? `https://www.themoviedb.org/t/p/w342${movie.poster_path}`
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
											onClick={() => {
												handleScrollList(listRefs, "right", "upcoming");
												handlePageList("right", "upcoming");
											}}
										/>
									</MovieList>
								</S.Wrapper>
							</>
						)}
						{series.length > 5 && (
							<>
								<h1>Series em alta</h1>
								<S.Wrapper>
									<MovieList ref={listRefs.series}>
										<ListButton
											direction={"left"}
											onClick={() => {
												handleScrollList(listRefs, "left", "series");
												handlePageList("left", "series");
											}}
										/>
										{series.map((movie) => (
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
																? `https://www.themoviedb.org/t/p/w342${movie.poster_path}`
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
											onClick={() => {
												handleScrollList(listRefs, "right", "series");
												handlePageList("right", "series");
											}}
										/>
									</MovieList>
								</S.Wrapper>
							</>
						)}

						{/* ----------------------- Movies & Series / from our DB --------------------------- */}

						{Object.entries(db).map((item) => (
							<div key={item[0]}>
								<h1>{item[0]}</h1>
								<S.Wrapper>
									<MovieList ref={listRefs[item[0]]}>
										<ListButton
											direction={"left"}
											onClick={() =>
												handleScrollList(listRefs, "left", item[0])
											}
										/>
										{item[1].map((movie) => (
											<Movie key={movie.id}>
												<Link to={`/details/${movie.id}`}>
													<img
														src={
															movie.poster_path
																? `https://www.themoviedb.org/t/p/w342${movie.poster_path}`
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
											onClick={() =>
												handleScrollList(listRefs, "right", item[0])
											}
										/>
									</MovieList>
								</S.Wrapper>
							</div>
						))}
					</>
				)}

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

			{/* ----------------------- From search results --------------------------- */}
			{moviesFromSearch.length >= 1 && <SearchContainer />}
		</>
	);
}
