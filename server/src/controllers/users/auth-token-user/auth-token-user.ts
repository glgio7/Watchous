import { IUser } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";
import {
	IAuthTokenController,
	IAuthTokenParams,
	IAuthTokenRepository,
} from "./protocols";

export class AuthTokenController implements IAuthTokenController {
	constructor(private readonly authTokenRepository: IAuthTokenRepository) {}

	async handle(
		httpRequest: HttpRequest<IAuthTokenParams>
	): Promise<HttpResponse<IUser>> {
		try {
			if (!httpRequest.headers || !httpRequest.headers.token) {
				return {
					statusCode: 500,
					body: "Token inválido, reinicie a sessão!",
				};
			}

			const user = await this.authTokenRepository.authUserWithToken({
				token: httpRequest.headers.token,
			});

			return {
				statusCode: 200,
				body: user,
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: `Bad request, ${error}`,
			};
		}
	}
}
