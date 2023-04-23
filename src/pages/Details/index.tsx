import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./styles";

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
	const { id } = useParams();
	const image_path = "https://themoviedb.org/t/p/original";
	const [movie, setMovie] = useState<ICurrentMovie>({} as ICurrentMovie);
	const [fullDescription, setFullDescription] = useState<boolean>(false);
	const [player, setPlayer] = useState<boolean>(false);

	// const goBack = () => window.history.back();

	useEffect(() => {
		window.scrollTo(0, 0);
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
				document.title = `Watchous - ${movie.title}`;
				setMovie(movie);
			})
			.catch((e) => console.log(e));
	}, [id]);

	return (
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
