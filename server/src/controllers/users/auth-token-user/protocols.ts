import { IUser } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface IAuthTokenParams {
	token: string;
}

export interface IAuthTokenController {
	handle(
		httpRequest: HttpRequest<IAuthTokenParams>
	): Promise<HttpResponse<IUser>>;
}

export interface IAuthTokenRepository {
	authUserWithToken(params: IAuthTokenParams): Promise<IUser>;
}
