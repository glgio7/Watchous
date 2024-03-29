import React from "react";
import { NavigateFunction } from "react-router-dom";
import { IUser } from "../../../contexts/AuthContext/types";

export type HandleSignInProps = {
	email: string;
	password: string;
	navigate: NavigateFunction;
	setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

export type handleSignInWithTokenProps = {
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
	setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	tokenPersistence: string;
};

export type HandleSignOutProps = {
	setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};
