import React from "react";
import * as S from "./styles";
import { Link } from "react-router-dom";
import { RiHeartFill } from "react-icons/ri";

type MovieCardProps = {
	vote_average: number;
	id: string;
	poster_path?: string;
	title: string;
};

const MovieCard = ({
	id,
	vote_average,
	poster_path,
	title,
}: MovieCardProps) => {
	return (
		<S.default key={id}>
			<div className="vote-average">
				<span>
					{Math.round(vote_average) !== 0 ? Math.round(vote_average) : "?"}
				</span>
				<p>
					{vote_average > 8
						? "★★★★★"
						: vote_average > 6
						? "★★★★"
						: vote_average > 4
						? "★★★"
						: vote_average > 2
						? "★★"
						: "★"}
				</p>
			</div>
			<Link to={`/details/${id}`}>
				<img
					src={
						poster_path
							? `https://www.themoviedb.org/t/p/w342${poster_path}`
							: "/img/movie_placeholder.jpg"
					}
					alt={""}
					className="moviePoster"
				/>
			</Link>
			<span>{title.length > 18 ? title.substring(0, 18) + "..." : title}</span>
			<RiHeartFill className="fav-btn" />
		</S.default>
	);
};

export default MovieCard;
