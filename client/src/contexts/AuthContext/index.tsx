import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { AuthProviderProps, IAuthContext, IUser } from "./types";
import axios from "axios";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	const [user, setUser] = useState<IUser | null>(null);

	const contextValues = { user, setUser, authenticated, setAuthenticated };

	const tokenPersistence = localStorage.getItem("token");
	useEffect(() => {
		if (tokenPersistence) {
			axios
				.post(`${process.env.REACT_APP_API_URL}/authtoken`, null, {
					headers: {
						token: tokenPersistence,
					},
				})
				.then((response) => {
					const { _id: id, name, username, token } = response.data;
					const user: IUser = { id, name, username, token };
					setAuthenticated(true);
					setUser(user);
					console.log("Login bem-sucedido!");
				})
				.catch((error) => {
					localStorage.removeItem("token");
				});
		}
	}, []);

	return (
		<AuthContext.Provider value={contextValues}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
