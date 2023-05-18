import axios, { AxiosError } from "axios";
import { HandleSignUpProps } from "./types";

export const handleSignUp = async ({
	firstName,
	lastName,
	email,
	password,
	navigate,
}: HandleSignUpProps) => {
	try {
		await axios.post(`${process.env.REACT_APP_API_URL}/users`, {
			firstName,
			lastName,
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