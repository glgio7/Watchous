import React, { useRef } from "react";
import * as S from "./styles";
import ListButton from "../ListButton";
import { handlePageList, handleScrollList } from "../../utils";
import MovieCard from "../MovieCard";
import { IMovie, IMovieFromDb } from "../MovieCard/types";

type IMovieListProps = {
	list: IMovie[] | IMovieFromDb[];
	options?: {
		listName: string;
		state: number;
		handlerFunc: React.Dispatch<React.SetStateAction<number>>;
	};
};

// NEXT STEP: Delete all "TYPES FOLDER" and create a file named "types.ts"

const MovieList = ({ list, options }: IMovieListProps) => {
	const listRef = useRef<HTMLUListElement>(null);

	return (
		<S.MovieList ref={listRef}>
			<ListButton
				direction={"left"}
				onClick={() => {
					handleScrollList(listRef, "left");

					if (options) {
						handlePageList(
							listRef,
							"left",
							options.listName,
							options.state,
							options.handlerFunc
						);
					}
				}}
			/>
			{list.map((movie) => (
				<MovieCard
					key={movie.id}
					id={movie.id}
					vote_average={movie.vote_average}
					title={movie.title || ""}
					name={movie.name || ""}
					poster_path={movie.poster_path}
					movie={movie}
				/>
			))}
			<ListButton
				direction={"right"}
				onClick={() => {
					handleScrollList(listRef, "right");

					if (options) {
						handlePageList(
							listRef,
							"right",
							options.listName,
							options.state,
							options.handlerFunc
						);
					}
				}}
			/>
		</S.MovieList>
	);
};

export default MovieList;
