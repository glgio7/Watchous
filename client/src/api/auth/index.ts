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
		const user: IUser = { id, name, username, token };

		if (!id) {
			throw new Error();
		}

		setAuthenticated(true);
		setUser(user);

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
};

export const handleSignInWithToken = async ({
	setUser,
}: handleSignInWithTokenProps) => {
	axios
		.post(`${process.env.REACT_APP_API_URL}/authtoken`, null, {
			headers: {
				// token: tokenPersistence,
			},
		})
		.then((response) => {
			const { id, name, username, token } = response.data;

			console.log("Login bem-sucedido!");
			setUser({ id, name, username, token });
		})
		.catch((error) => {
			console.log(error);
		});
};
