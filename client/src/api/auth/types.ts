import React from "react";
import { NavigateFunction } from "react-router-dom";

export type HandleAuthProps = {
	email: string;
	password: string;
	navigate: NavigateFunction;
	setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};
