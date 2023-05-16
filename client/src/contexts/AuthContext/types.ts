import React, { SetStateAction } from "react";

export interface IAuthContext {
	authenticated: boolean;
	setAuthenticated: React.Dispatch<SetStateAction<boolean>>;
}

export type AuthProviderProps = {
	children: React.ReactNode;
};
