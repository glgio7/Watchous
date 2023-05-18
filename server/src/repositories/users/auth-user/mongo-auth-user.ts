import {
	IAuthUserParams,
	IAuthUserRepository,
} from "../../../controllers/users/auth-user/protocols";
import { MongoClientUsers } from "../../../database/mongo";
import { IUser } from "../../../models/user";
import jwt from "jsonwebtoken";

export class MongoAuthUserRepository implements IAuthUserRepository {
	async authUser(params: IAuthUserParams): Promise<IUser> {
		const { email, password } = params;

		const user = await MongoClientUsers.db
			.collection<IUser>("users")
			.findOne({ email, password });

		if (!user) throw new Error("Invalid credentials");

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
			expiresIn: "2h",
		});

		user.token = token;

		return user;
	}
}
