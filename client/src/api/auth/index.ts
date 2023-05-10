import axios from "axios";
import { HandleAuthProps } from "./types";
import { config } from "dotenv";

config();

const axiosInstance = axios.create();

export const handleAuth = async ({
	email,
	password,
	navigate,
}: HandleAuthProps) => {
	try {
		const response = await axiosInstance.post(
			`${process.env.REACT_APP_API_URL}/auth`,
			{
				email,
				password,
			}
		);

		const id = await response.data._id;

		if (!id) {
			throw new Error();
		}

		console.log(response.data);
		navigate("/");
	} catch (error) {
		console.log(error);
		alert("Credenciais inválidas!");
	}
};
