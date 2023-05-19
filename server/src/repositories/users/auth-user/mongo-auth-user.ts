import {
	IAuthUserParams,
	IAuthUserRepository,
} from "../../../controllers/users/auth-user/protocols";
import { MongoClientUsers } from "../../../database/mongo";
import { IUser } from "../../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class MongoAuthUserRepository implements IAuthUserRepository {
	async authUser(params: IAuthUserParams): Promise<IUser> {
		const { email, password } = params;

		const user = await MongoClientUsers.db
			.collection<IUser>("users")
			.findOne({ email });

		if (!user) throw new Error("Invalid credentials.");

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) throw new Error("Invalid password.");

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
			expiresIn: "2h",
		});

		user.token = token;

		return user;
	}
}
