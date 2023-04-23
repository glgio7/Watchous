import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./styles";

const apiKey = process.env.REACT_APP_API_KEY;

interface IMovie {
	name?: string;
	id?: string;
	key?: string;
	title: string;
	nota: number;
	fullSinopse: string;
	sinopse: string;
	poster_path: string;
	background: string;
	lastEpisode: string;
	genres: string;
	trailer?: string;
}

export default function SeriesDetails() {
	const { id } = useParams<string>();
	const image_path = "https://themoviedb.org/t/p/original";
	const [movie, setMovie] = useState<IMovie>({} as IMovie);
	const [fullDescription, setFullDescription] = useState(false);
	const [player, setPlayer] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		const infos = () => {
			fetch(
				`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`
			)
				.then((response) => response.json())
				.then((data) => {
					const movie: IMovie = {
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
						nota: Math.round(data.vote_average),
					};
					document.title = `Watchous - ${movie.title}`;
					setMovie(movie);
				})
				.catch((e) => console.log(e));
		};

		const trailer = () => {
			fetch(
				`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=en-US`
			)
				.then((response) => response.json())
				.then((data) => {
					setMovie((prevState) => ({
						...prevState,
						trailer: data.results[0].key,
					}));
				})
				.catch((e) => console.log(e));
		};

		Promise.all([infos(), trailer()]);
	}, [id]);

	return (
		<S.Container background={`${image_path}/${movie.background}`}>
			<div className="fade"></div>
			<section className="card-container">
				<div className="container-info__top">
					<strong>Ultimo episódio:</strong>
					{movie.lastEpisode}
				</div>
				<img
					src={`${image_path}/${movie.poster_path}`}
					alt={`Capa do filme ${movie.title}`}
				/>
				<div className="container-info__bottom" onClick={() => setPlayer(true)}>
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
					<span>Nota da audiencia:</span> {movie.nota}
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
	);
}
