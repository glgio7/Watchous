import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController {
	constructor(private readonly getUsersRepository: IGetUsersRepository) {}

	async handle() {
		const users = await this.getUsersRepository.getUsers();
		// validar req
		// direcionar req para repo
	}
}
