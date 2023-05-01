import * as S from "./styles";
import db from "../../api/movies_list.json";
import React, { useState, useRef, useEffect, useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import Wrapper from "../../components/Wrapper";
import ListButton from "../../components/ListButton";
import MovieList from "../../components/MovieList";
import Loading from "../../components/Loading";
import { RiCloseFill } from "react-icons/ri";
import { IListRefs } from "../../utils/types";
import { handlePageList, handleScrollList } from "../../utils";
import { IMovie, IMovieFromDb } from "../../components/MovieCard/types";
import MovieCard from "../../components/MovieCard";

export default function Home() {
	const apiKey = process.env.REACT_APP_API_KEY;

	const { seriesFromSearch, moviesFromSearch, setSearchValue } = useContext(
		SearchContext
	);

	const [disclaimer, setDisclaimer] = useState(false);
	const handleDisclaimer = () => setDisclaimer(!disclaimer);

	const [upcomingPage, setUpcomingPage] = useState(1);
	const [seriesPage, setSeriesPage] = useState(1);
	const [upcoming, setUpcoming] = useState<IMovie[]>([]);
	const [series, setSeries] = useState<IMovie[]>([]);

	const listRefs: IListRefs = {
		searchMovies: useRef<HTMLUListElement>(null),
		searchSeries: useRef<HTMLUListElement>(null),
		upcoming: useRef<HTMLUListElement>(null),
		series: useRef<HTMLUListElement>(null),
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
								<Wrapper>
									<MovieList ref={listRefs.upcoming}>
										<ListButton
											direction={"left"}
											onClick={() => {
												handleScrollList(listRefs, "left", "upcoming");
												handlePageList(
													listRefs,
													"left",
													"upcoming",
													upcomingPage,
													setUpcomingPage
												);
											}}
										/>
										{upcoming.map((movie) => (
											<MovieCard
												key={movie.id}
												id={movie.id}
												vote_average={movie.vote_average}
												title={movie.title || ""}
												name={movie.name || ""}
												poster_path={movie.poster_path}
												onClick={() => setSearchValue("")}
											/>
										))}
										<ListButton
											direction={"right"}
											onClick={() => {
												handleScrollList(listRefs, "right", "upcoming");
												handlePageList(
													listRefs,
													"right",
													"upcoming",
													upcomingPage,
													setUpcomingPage
												);
											}}
										/>
									</MovieList>
								</Wrapper>
							</>
						)}
						{series.length > 5 && (
							<>
								<h1>Series em alta</h1>
								<Wrapper>
									<MovieList ref={listRefs.series}>
										<ListButton
											direction={"left"}
											onClick={() => {
												handleScrollList(listRefs, "left", "series");
												handlePageList(
													listRefs,
													"left",
													"series",
													seriesPage,
													setSeriesPage
												);
											}}
										/>
										{series.map((movie) => (
											<MovieCard
												key={movie.id}
												id={movie.id}
												vote_average={movie.vote_average}
												title={movie.title || ""}
												name={movie.name || ""}
												poster_path={movie.poster_path}
											/>
										))}
										<ListButton
											direction={"right"}
											onClick={() => {
												handleScrollList(listRefs, "right", "series");
												handlePageList(
													listRefs,
													"right",
													"series",
													seriesPage,
													setSeriesPage
												);
											}}
										/>
									</MovieList>
								</Wrapper>
							</>
						)}

						{/* ----------------------- Movies & Series / from our DB --------------------------- */}

						{Object.entries(db).map((item) => (
							<div key={item[0]}>
								<h1>{item[0]}</h1>
								<Wrapper>
									<MovieList ref={listRefs[item[0]]}>
										<ListButton
											direction={"left"}
											onClick={() =>
												handleScrollList(listRefs, "left", item[0])
											}
										/>
										{item[1].map((movie: IMovieFromDb) => (
											<MovieCard
												key={movie.id}
												id={movie.id}
												vote_average={movie.vote_average}
												title={movie.title || ""}
												name={movie.name || ""}
												poster_path={movie.poster_path}
											/>
										))}
										<ListButton
											direction={"right"}
											onClick={() =>
												handleScrollList(listRefs, "right", item[0])
											}
										/>
									</MovieList>
								</Wrapper>
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
		</>
	);
}
