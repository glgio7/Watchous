import {
	ICreateUserParams,
	ICreateUserRepository,
} from "../../../controllers/users/create-user/protocols";
import { MongoClientUsers } from "../../../database/mongo";
import { IUser } from "../../../models/user";
import bcrypt from "bcrypt";

export class MongoCreateUserRepository implements ICreateUserRepository {
	async createUser(params: ICreateUserParams): Promise<IUser> {
		const { email, password, createdAt } = params;
		const userExists = await MongoClientUsers.db
			.collection("users")
			.findOne({ email });

		if (userExists) {
			throw new Error(`Email is already in use.`);
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const currentDate = new Date().toLocaleDateString();

		const { insertedId } = await MongoClientUsers.db
			.collection("users")
			.insertOne({
				...params,
				password: hashedPassword,
				createdAt: currentDate,
			});

		const user = await MongoClientUsers.db
			.collection<Omit<IUser, "id">>("users")
			.findOne({ _id: insertedId });

		if (!user) throw new Error("User not created");

		const { _id, ...rest } = user;

		return { id: _id.toHexString(), ...rest };
	}
}
