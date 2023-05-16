import React, { SetStateAction } from "react";

export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	token?: string;
}

export interface IAuthContext {
	user: IUser | null;
	setUser: React.Dispatch<SetStateAction<IUser | null>>;
	authenticated: boolean;
	setAuthenticated: React.Dispatch<SetStateAction<boolean>>;
}

export type AuthProviderProps = {
	children: React.ReactNode;
};
