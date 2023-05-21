import { ObjectId } from "mongodb";
import {
	IUpdateUserParams,
	IUpdateUserRepository,
} from "../../../controllers/users/update-user/protocols";
import { MongoClientUsers } from "../../../database/mongo";
import { IUser } from "../../../models/user";
import bcrypt from "bcrypt";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
	async updateUser(params: IUpdateUserParams): Promise<IUser> {
		const { id, password, ...updateData } = params;

		const user = await MongoClientUsers.db
			.collection("users")
			.findOne({ _id: new ObjectId(id) });

		if (!user) {
			throw new Error("User not found");
		}

		// Partially update user with updateData properties
		const updatedUser: Partial<IUser> = { ...user, ...updateData };

		// Verify if there's "password" field, compare and hash a new password.
		if (password) {
			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				throw new Error("Password invalid!");
			}

			const hashedPassword = await bcrypt.hash(password, 10);
			updatedUser.password = hashedPassword;
		}

		await MongoClientUsers.db
			.collection("users")
			.updateOne({ _id: new ObjectId(id) }, { $set: updatedUser });

		return updatedUser as IUser;
	}
}
