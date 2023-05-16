import React from "react";
import { createContext, useState } from "react";
import { AuthProviderProps, IAuthContext } from "./types";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	const contextValues = { authenticated, setAuthenticated };

	return (
		<AuthContext.Provider value={contextValues}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
