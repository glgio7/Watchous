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
			if (!httpRequest.body?.token) {
				return {
					statusCode: 400,
					body: `Sorry, field token is invalid or doesn't exist on our db.`,
				};
			}
			const user = await this.authTokenRepository.authUserWithToken(
				httpRequest.body!
			);

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
