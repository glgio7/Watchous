import { IUser } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
	ICreateUserController,
	ICreateUserParams,
	ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
	constructor(private readonly createUserRepository: ICreateUserRepository) {}

	async handle(
		httpRequest: HttpRequest<ICreateUserParams>
	): Promise<HttpResponse<IUser>> {
		try {
			const requiredFields = ["firstName", "lasstName", "email", "password"];

			for (const field of requiredFields) {
				if (!httpRequest.body?.[field as keyof ICreateUserParams]) {
					return {
						statusCode: 400,
						body: `Need to specify a ${field} `,
					};
				}
			}

			const user = await this.createUserRepository.createUser(
				httpRequest.body!
			);

			return {
				statusCode: 200,
				body: user,
			};
		} catch (err) {
			return {
				statusCode: 500,
				body: `Bad request, ${err}`,
			};
		}
	}
}
