import React, { useContext } from "react";
import * as S from "./styles";
import { Link } from "react-router-dom";
import { RiHeartFill } from "react-icons/ri";
import { MovieCardProps } from "./types";
import { FavoritesContext } from "../../contexts/FavoritesContext";

const MovieCard = ({
	id,
	vote_average,
	poster_path,
	title,
	name,
	free,
	movie,
	onClick,
}: MovieCardProps) => {
	const { favorites, handleFavorite } = useContext(FavoritesContext);

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
			{!free && (
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
			)}

			{free && (
				<a href={`https://youtu.be/${free}`} target="_blank">
					<img
						src={
							poster_path
								? `https://www.themoviedb.org/t/p/w342${poster_path}`
								: "/img/movie_placeholder.jpg"
						}
						alt={""}
						className="moviePoster"
					/>
				</a>
			)}
			<span>
				{title && title.length > 18 ? title.substring(0, 18) + "..." : title}
				{name && name.length > 18 ? name.substring(0, 18) + "..." : name}
			</span>
			<RiHeartFill
				className={
					favorites.some((item) => {
						if (movie) {
							return item.id === movie.id;
						}
					})
						? "unfav-btn"
						: "fav-btn"
				}
				onClick={() => movie && handleFavorite(movie)}
			/>
		</S.Movie>
	);
};

export default MovieCard;
