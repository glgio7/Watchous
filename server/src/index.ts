import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";

const main = async () => {
	dotenv.config();

	const port = process.env.PORT || 8000;
	const app = express();
	const router = Router();

	await MongoClient.connect();

	router.get("/users", async (req, res) => {
		const getUsersRepository = new MongoGetUsersRepository();
		const getUsersController = new GetUsersController(getUsersRepository);

		const response = await getUsersController.handle();

		res.send(response.body).status(response.statusCode);
	});

	app.use(cors());
	app.use("/", router);

	app.listen(port, () => console.log(`Everything is ok!`));
};

main();
