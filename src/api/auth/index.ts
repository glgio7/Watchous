import axios from "axios";
import { HandleAuthProps } from "./types";
import { config } from "dotenv";

config();

const port = process.env.PORT || 8000;

export const handleAuth = async ({
	email,
	password,
	navigate,
}: HandleAuthProps) => {
	try {
		const response = await axios.post(`/auth`, {
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
