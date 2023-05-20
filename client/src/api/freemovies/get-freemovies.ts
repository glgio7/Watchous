import axios from "axios";
import { IFreeMovie } from "./types";

export const getFreeMovies = async () => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_API_URL}/freemovies`
		);

		const movieList: IFreeMovie[] = await response.data;

		return movieList;
	} catch (error) {
		console.log(error);
	}
};
