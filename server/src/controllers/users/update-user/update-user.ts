import { IUser } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";
import {
	IUpdateUserController,
	IUpdateUserParams,
	IUpdateUserRepository,
} from "./protocols";

export class UpdateUserController implements IUpdateUserController {
	constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

	async handle(
		httpRequest: HttpRequest<IUpdateUserParams>
	): Promise<HttpResponse<IUser>> {
		try {
			const { body } = httpRequest;
			if (!body || Object.keys(body).length < 2) {
				return {
					statusCode: 400,
					body: "At least one property to updated required",
				};
			}

			const user = await this.updateUserRepository.updateUser(
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
