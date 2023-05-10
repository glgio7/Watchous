import axios from "axios";
import { HandleAuthProps } from "./types";
import { config } from "dotenv";

config();

const port = process.env.PORT || 8000;

const apiURL =
	process.env.NODE_ENV === "production"
		? "https://watchous.netlify.app/auth"
		: `http://localhost:${port}/auth`;

export const handleAuth = async ({
	email,
	password,
	navigate,
}: HandleAuthProps) => {
	try {
		const response = await axios.post(apiURL, {
			email,
			password,
		});

		const id = await response.data._id;

		if (!id) {
			throw new Error();
		}

		console.log(response.data);
		navigate("/");
	} catch (error) {
		alert("Credenciais inválidas!");
	}
};
