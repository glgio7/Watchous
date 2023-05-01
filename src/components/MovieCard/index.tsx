import React from "react";
import * as S from "./styles";
import { Link } from "react-router-dom";
import { RiHeartFill } from "react-icons/ri";
import { MovieCardProps } from "./types";

const MovieCard = ({
	id,
	vote_average,
	poster_path,
	title,
	name,
	onClick,
}: MovieCardProps) => {
	return (
		<S.Movie key={id} onClick={onClick}>
			<div className="vote-average">
				<span>
					{vote_average && Math.round(vote_average) !== 0
						? Math.round(vote_average)
						: "?" || "?"}
				</span>
				<p>
					{vote_average && vote_average > 8
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
			<Link to={title ? `/details/${id}` : `/details/series/${id}`}>
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
			<span>
				{title && title.length > 18 ? title.substring(0, 18) + "..." : title}
				{name && name.length > 18 ? name.substring(0, 18) + "..." : name}
			</span>
			<RiHeartFill className="fav-btn" />
		</S.Movie>
	);
};

export default MovieCard;
