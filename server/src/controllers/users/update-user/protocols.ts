import { IUser } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface IUpdateUserParams {
	id: string;
	password: string;
	newPassword?: string;
	name?: string;
	username?: string;
	email?: string;
	profileIcon?: string;
	favoritesMovies?: {
		title: string;
		name: string;
		poster_path: string;
		id: string;
		vote_Average: string;
	}[];
}

export interface IUpdateUserController {
	handle(
		httpRequest: HttpRequest<IUpdateUserParams>
	): Promise<HttpResponse<IUser>>;
}

export interface IUpdateUserRepository {
	updateUser(params: IUpdateUserParams): Promise<IUser>;
}
