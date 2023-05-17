import { NavigateFunction } from "react-router-dom";

export type HandleSignUpProps = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	navigate: NavigateFunction;
};
