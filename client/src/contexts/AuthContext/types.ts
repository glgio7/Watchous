import React, { SetStateAction } from "react";

export interface IUser {
	id: string;
	name: string;
	username: string;
	email: string;
	createdAt: string;
	token?: string;
	profileIcon?: string;
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
