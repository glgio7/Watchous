import { NavigateFunction } from "react-router-dom";

export type HandleSignUpProps = {
	name: string;
	username: string;
	email: string;
	password: string;
	navigate: NavigateFunction;
};
