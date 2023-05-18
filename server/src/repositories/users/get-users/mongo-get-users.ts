import { IGetUsersRepository } from "../../../controllers/users/get-users/protocols";
import { MongoClientUsers } from "../../../database/mongo";
import { IUser } from "../../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
	async getUsers(): Promise<IUser[]> {
		const users = await MongoClientUsers.db
			.collection<Omit<IUser, "id">>("users")
			.find({})
			.toArray();

		return users.map(({ _id, ...user }) => ({
			...user,
			id: _id.toHexString(),
		}));
	}
}
