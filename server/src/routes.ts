import { Router } from "express";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { MongoAuthUserRepository } from "./repositories/auth-user/mongo-auth-user";
import { AuthUserController } from "./controllers/auth-user/auth-user";

export const createRoutes = () => {
	const router = Router();

	router.get("/api/users", async (req, res) => {
		const getUsersRepository = new MongoGetUsersRepository();
		const getUsersController = new GetUsersController(getUsersRepository);

		const response = await getUsersController.handle();

		res.status(response.statusCode).send(response.body);
	});

	router.post("/api/users", async (req, res) => {
		const createUserRepository = new MongoCreateUserRepository();
		const createUserController = new CreateUserController(createUserRepository);

		const { body, statusCode } = await createUserController.handle({
			body: req.body,
		});

		res.status(statusCode).send(body);
	});

	router.post("/api/auth", async (req, res) => {
		const authUserRepository = new MongoAuthUserRepository();
		const authUserController = new AuthUserController(authUserRepository);

		const { body, statusCode } = await authUserController.handle({
			body: req.body,
		});

		res.status(statusCode).send(body);
	});

	return router;
};
