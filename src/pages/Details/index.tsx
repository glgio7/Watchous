import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link, useParams } from "react-router-dom";
import { RiArrowLeftLine, RiCloseFill } from "react-icons/ri";
import * as S from "../Home/styles";
import { Movie } from "../../components/movieitem";
import { Container } from "./styles";

interface ICurrentMovie {
	id?: string;
	title: string;
	nota: number;
	fullSinopse: string;
	sinopse: string;
	poster_path: string;
	background: string;
	genres: string;
	release?: string;
	trailer?: string;
}

const apiKey = process.env.REACT_APP_API_KEY;

export default function Details() {
	const [valorDoFiltro, setValorDoFiltro] = useState("");
	const { id } = useParams();
	const image_path = "https://themoviedb.org/t/p/original";
	const [movie, setMovie] = useState<ICurrentMovie>({} as ICurrentMovie);
	const [fullDescription, setFullDescription] = useState<boolean>(false);
	const [player, setPlayer] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const goBack = () => window.history.back();
	const showFull = () => setFullDescription(!fullDescription);
	const Load = () => window.scrollTo(0, 0);
	const togglePlayer = () => {
		setPlayer(!player);
		Load();
	};

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos&language=pt-BR`
		)
			.then((response) => response.json())
			.then((data) => {
				const movie: ICurrentMovie = {
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
					nota: Math.round(data.vote_average),
				};
				console.log(data);
				document.title = `Watchous - ${movie.title}`;
				setMovie(movie);
			})
			.catch((e) => console.log(e));
	}, [id]);

	///////////////////////////////////////////////////////////////////////FROM SEARCH
	// const [fromSearch, setFromSearch] = useState<[] | null>([]);
	// const serverSearch = valorDoFiltro.replaceAll(" ", "+");

	// useEffect(() => {
	// 	fetch(
	// 		`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${serverSearch}&language=pt-BR`
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setFromSearch(data.results);
	// 		});
	// }, [serverSearch]);
	///////////////////////////////////////////////////////////////////////////////////
	return (
		<>
			<Header
				// valorDoFiltro={valorDoFiltro}
				setSearchValue={setValorDoFiltro}
			/>
			<Container background={`${image_path}/${movie.background}`} onLoad={Load}>
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
					<div className="container-info__bottom">
						<span>Ver trailer</span>
					</div>
				</section>
				<section className="overview-container">
					<div className="container-info__top">{movie.genres}</div>
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
						<span>Nota da audiencia:</span> {movie.nota}
					</div>
				</section>
			</Container>
		</>
	);
}
