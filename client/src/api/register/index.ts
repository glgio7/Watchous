import axios, { AxiosError } from "axios";
import { HandleSignUpProps } from "./types";

export const handleSignUp = async ({
	name,
	username,
	email,
	password,
	navigate,
}: HandleSignUpProps) => {
	try {
		await axios.post(`${import.meta.env.VITE_APP_API_URL}/users`, {
			name,
			username,
			email,
			password,
		});
		navigate("/login");
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log((error as AxiosError).response);
		}
		alert((error as AxiosError).response!.data);
	}
};
