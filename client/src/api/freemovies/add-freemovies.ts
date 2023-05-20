import axios, { AxiosError } from "axios";

export const addFreeMovie = async (
	imdb: string,
	title: string,
	imgUrl: string,
	youtubeUrl: string
) => {
	try {
		await axios.post(`${process.env.REACT_APP_API_URL}/freemovies`, {
			imdb,
			title,
			imgUrl,
			youtubeUrl,
		});
		alert("Adicionado à lista de gratuitos!");
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log((error as AxiosError).response);
		}
		alert((error as AxiosError).response!.data);
	}
};
