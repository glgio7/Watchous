import {
	IAuthTokenParams,
	IAuthTokenRepository,
} from "../../../controllers/users/auth-token-user/protocols";
import { MongoClientUsers } from "../../../database/mongo";
import { IUser } from "../../../models/user";
import jwt from "jsonwebtoken";

export class MongoAuthTokenRepository implements IAuthTokenRepository {
	async authUserWithToken(params: IAuthTokenParams): Promise<IUser> {
		const { token } = params;

		try {
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
				userId: string;
			};

			const user = await MongoClientUsers.db
				.collection<IUser>("users")
				.findOne({ id: decodedToken.userId });

			if (!user) throw new Error("Invalid token");

			user.token = token;

			return user;
		} catch (error) {
			throw new Error("Invalid token");
		}
	}
}