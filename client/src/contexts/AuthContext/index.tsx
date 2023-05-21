import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { AuthProviderProps, IAuthContext, IUser } from "./types";
import { handleSignInWithToken } from "../../api/users/auth";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	const [user, setUser] = useState<IUser | null>(null);

	let tokenPersistence = localStorage.getItem("token");

	const contextValues = {
		user,
		setUser,
		authenticated,
		setAuthenticated,
	};

	useEffect(() => {
		if (tokenPersistence) {
			try {
				handleSignInWithToken({ setUser, tokenPersistence, setAuthenticated });
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	return (
		<AuthContext.Provider value={contextValues}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
