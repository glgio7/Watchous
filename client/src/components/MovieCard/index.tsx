import * as S from "./styles";
import { Link } from "react-router-dom";
import { RiHeartFill } from "react-icons/ri";
import { MovieCardProps } from "./types";
import { useFavorites } from "../../hooks/useFavorites";
import { useFromSearch } from "../../hooks/useFromSearch";

const MovieCard = ({
	id,
	vote_average,
	poster_path,
	title,
	name,
	free,
	movie,
}: MovieCardProps) => {
	const { favorites, handleFavorite } = useFavorites();

	const { setSearchValue } = useFromSearch();

	return (
		<S.Movie key={id} onClick={() => setSearchValue("")}>
			<div className="vote-average">
				<span>{Math.round(vote_average) || "★"}</span>
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
			{!free && (
				<Link to={name ? `/details/series/${id}` : `/details/${id}`}>
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
				<img
					src={
						poster_path
							? `https://www.themoviedb.org/t/p/w342${poster_path}`
							: "/img/movie_placeholder.jpg"
					}
					alt={""}
					className="moviePoster"
				/>
			)}
			<span>
				{title && title.length > 18 ? title.substring(0, 18) + "..." : title}
				{name && name.length > 18 ? name.substring(0, 18) + "..." : name}
			</span>
			{!free && (
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
			)}
		</S.Movie>
	);
};

export default MovieCard;
