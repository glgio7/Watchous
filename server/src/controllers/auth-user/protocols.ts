import { IUser } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IAuthUserController {
	handle(
		HttpRequest: HttpRequest<IAuthUserParams>
	): Promise<HttpResponse<IUser>>;
}

export interface IAuthUserParams {
	email: string;
	password: string;
}

export interface IAuthUserRepository {
	authUser(params: IAuthUserParams): Promise<IUser>;
}
