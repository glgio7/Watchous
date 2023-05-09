import {
	IAuthUserParams,
	IAuthUserRepository,
} from "../../controllers/auth-user/protocols";
import { MongoClient } from "../../database/mongo";
import { IUser } from "../../models/user";

export class MongoAuthUserRepository implements IAuthUserRepository {
	async authUser(params: IAuthUserParams): Promise<IUser> {
		const { email, password } = params;

		const user = await MongoClient.db
			.collection<IUser>("users")
			.findOne({ email, password });

		if (!user) throw new Error("Invalid credentials");

		return user;
	}
}
