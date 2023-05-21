import axios from "axios";
import {
	HandleSignInProps,
	HandleSignOutProps,
	handleSignInWithTokenProps,
} from "./types";
import { IUser } from "../../contexts/AuthContext/types";

export const handleSignIn = async ({
	email,
	password,
	navigate,
	setAuthenticated,
	setUser,
}: HandleSignInProps) => {
	try {
		const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth`, {
			email,
			password,
		});

		const { _id: id, name, username, token } = await response.data;
		const user: IUser = { id, name, username, token, email };

		if (!id) {
			throw new Error();
		}

		setAuthenticated(true);
		setUser(user);
		localStorage.setItem("token", token);

		navigate("/");
	} catch (error) {
		console.log(error);
		alert("Credenciais inválidas!");
	}
};

export const handleSignOut = async ({
	setAuthenticated,
	setUser,
}: HandleSignOutProps) => {
	setAuthenticated(false);
	setUser(null);

	localStorage.removeItem("token");
};

export const handleSignInWithToken = async ({
	setUser,
	tokenPersistence,
}: handleSignInWithTokenProps) => {
	axios
		.post(`${process.env.REACT_APP_API_URL}/auth/token`, {
			token: tokenPersistence,
		})
		.then((response) => {
			const { _id: id, name, username, token, email } = response.data;

			console.log("Login bem-sucedido!");
			setUser({ id, name, username, token, email });
		})
		.catch((error) => {
			console.log(error);
		});
};
