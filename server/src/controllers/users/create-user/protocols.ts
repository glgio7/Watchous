import { IUser } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface ICreateUserController {
	handle(
		HttpRequest: HttpRequest<ICreateUserParams>
	): Promise<HttpResponse<IUser>>;
}

export interface ICreateUserParams {
	name: string;
	username: string;
	email: string;
	password: string;
}

export interface ICreateUserRepository {
	createUser(params: ICreateUserParams): Promise<IUser>;
}
