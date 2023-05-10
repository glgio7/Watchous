import * as S from "./styles";
import React, { useState, useEffect, useContext } from "react";
import db from "../../api/movies_list.json";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { IMovie } from "../../components/MovieCard/types";
import { RiCloseFill } from "react-icons/ri";
import Wrapper from "../../components/Wrapper";
import Loading from "../../components/Loading";
import MovieList from "../../components/MovieList";
import axios from "axios";

export default function Home() {
	const apiKey = process.env.REACT_APP_API_KEY;

	const { favorites } = useContext(FavoritesContext);

	const [disclaimer, setDisclaimer] = useState(false);
	const handleDisclaimer = () => setDisclaimer(!disclaimer);

	const [upcomingPage, setUpcomingPage] = useState(1);
	const [seriesPage, setSeriesPage] = useState(1);
	const [upcoming, setUpcoming] = useState<IMovie[]>([]);
	const [series, setSeries] = useState<IMovie[]>([]);

	//////////////////// upcoming
	useEffect(() => {
		axios
			.get(
				`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR&page=${upcomingPage}`
			)
			.then((response) => {
				const data: IMovie[] = response.data.results;
				setUpcoming(data);
			})
			.catch((err) => console.log(err));
	}, [upcomingPage]);
	//////////////////// series
	useEffect(() => {
		axios
			.get(
				`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR&page=${seriesPage}`
			)
			.then((response) => {
				const data: IMovie[] = response.data.results;
				setSeries(data);
			})
			.catch((err) => console.log(err));
	}, [seriesPage]);

	return (
		<>
			{upcoming.length < 5 && <Loading />}

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
				{/* ----------------------- Movies & Series / Recommended --------------------------- */}
				{favorites.length > 0 && (
					<>
						<h1>Favoritos</h1>
						<Wrapper>
							<MovieList list={favorites} />
						</Wrapper>
					</>
				)}

				{upcoming.length > 5 && (
					<>
						<h1>Novos no Watchous</h1>
						<Wrapper>
							<MovieList
								list={upcoming}
								options={{
									listName: "upcoming",
									state: upcomingPage,
									handlerFunc: setUpcomingPage,
								}}
							/>
						</Wrapper>
					</>
				)}
				{series.length > 5 && (
					<>
						<h1>Series em alta</h1>
						<Wrapper>
							<MovieList
								list={series}
								options={{
									listName: "series",
									state: seriesPage,
									handlerFunc: setSeriesPage,
								}}
							/>
						</Wrapper>
					</>
				)}

				{/* ----------------------- Movies & Series / from our DB --------------------------- */}

				{Object.entries(db).map((item) => (
					<div key={item[0]}>
						<h1>{item[0]}</h1>
						<Wrapper>
							<MovieList list={item[1]} />
						</Wrapper>
					</div>
				))}

				{/* ----------------------- Disclaimer/Advices --------------------------- */}
				<div className={disclaimer ? "disclaimer active" : "disclaimer"}>
					<RiCloseFill className="closeDisclaimer" onClick={handleDisclaimer} />
					<h2>Novidade: adicione filmes aos favoritos</h2>
					<h2>Em breve: cadastro e lista de interesse.</h2>
				</div>
				<button className="buttonDisclaimer" onClick={handleDisclaimer}>
					?
				</button>
			</S.Container>
		</>
	);
}
