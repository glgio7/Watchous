import React from "react";
import { createContext, useState } from "react";
import { AuthProviderProps, IAuthContext, IUser } from "./types";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	const [user, setUser] = useState<IUser | null>(null);

	const contextValues = {
		user,
		setUser,
		authenticated,
		setAuthenticated,
	};

	// useEffect(() => {
	// 	if (tokenPersistence) {
	// 		handleSignInWithToken({ setUser }).then(() => {
	// 			setAuthenticated(true);
	// 		});
	// 	}
	// }, []);

	return (
		<AuthContext.Provider value={contextValues}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
