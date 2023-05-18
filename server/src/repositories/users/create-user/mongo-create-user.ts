import {
	ICreateUserParams,
	ICreateUserRepository,
} from "../../../controllers/users/create-user/protocols";
import { MongoClientUsers } from "../../../database/mongo";
import { IUser } from "../../../models/user";

export class MongoCreateUserRepository implements ICreateUserRepository {
	async createUser(params: ICreateUserParams): Promise<IUser> {
		const { email } = params;
		const userExists = await MongoClientUsers.db
			.collection("users")
			.findOne({ email: email });

		if (userExists) {
			throw new Error(`Email is already in use.`);
		}

		const { insertedId } = await MongoClientUsers.db
			.collection("users")
			.insertOne(params);

		const user = await MongoClientUsers.db
			.collection<Omit<IUser, "id">>("users")
			.findOne({ _id: insertedId });

		if (!user) throw new Error("User not created");

		const { _id, ...rest } = user;

		return { id: _id.toHexString(), ...rest };
	}
}
