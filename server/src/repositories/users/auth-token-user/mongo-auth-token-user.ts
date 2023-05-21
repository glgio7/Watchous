import { ObjectId } from "mongodb";
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
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
			userId: string;
		};

		if (!decodedToken) throw new Error("Invalid token.");

		const user = await MongoClientUsers.db
			.collection<IUser>("users")
			.findOne({ _id: new ObjectId(decodedToken.userId) });

		if (!user) throw new Error("User not found.");

		return user;
	}
}
