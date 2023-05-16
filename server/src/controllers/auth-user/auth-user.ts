import { IUser } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
	IAuthUserRepository,
	IAuthUserController,
	IAuthUserParams,
} from "./protocols";

export class AuthUserController implements IAuthUserController {
	constructor(private readonly authUserRepository: IAuthUserRepository) {}

	async handle(
		httpRequest: HttpRequest<IAuthUserParams>
	): Promise<HttpResponse<IUser>> {
		try {
			const requiredFields = ["email", "password"];

			for (const field of requiredFields) {
				if (!httpRequest.body?.[field as keyof IAuthUserParams]) {
					return {
						statusCode: 400,
						body: `Sorry, field "${field}" is invalid or doesn't exist on our db.`,
					};
				}
			}
			const user = await this.authUserRepository.authUser(httpRequest.body!);

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
