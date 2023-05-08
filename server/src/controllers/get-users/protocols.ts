import { IUser } from "../../models/user";

export interface IGetUsersController {
	handle(): Promise<void>;
}

export interface IGetUsersRepository {
	getUsers(): Promise<IUser[]>;
}
