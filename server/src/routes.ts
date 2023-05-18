import { Router } from "express";
import { GetUsersController } from "./controllers/users/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/users/get-users/mongo-get-users";
import { MongoCreateUserRepository } from "./repositories/users/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/users/create-user/create-user";
import { MongoAuthUserRepository } from "./repositories/users/auth-user/mongo-auth-user";
import { AuthUserController } from "./controllers/users/auth-user/auth-user";
import { MongoAuthTokenRepository } from "./repositories/users/auth-token-user/mongo-auth-token-user";
import { AuthTokenController } from "./controllers/users/auth-token-user/auth-token-user";

export const createRoutes = () => {
	const router = Router();

	router.get("/users", async (req, res) => {
		const getUsersRepository = new MongoGetUsersRepository();
		const getUsersController = new GetUsersController(getUsersRepository);

		const response = await getUsersController.handle();

		res.status(response.statusCode).send(response.body);
	});

	router.post("/users", async (req, res) => {
		const createUserRepository = new MongoCreateUserRepository();
		const createUserController = new CreateUserController(createUserRepository);

		const { body, statusCode } = await createUserController.handle({
			body: req.body,
		});

		res.status(statusCode).send(body);
	});

	router.post("/auth", async (req, res) => {
		const authUserRepository = new MongoAuthUserRepository();
		const authUserController = new AuthUserController(authUserRepository);

		const { body, statusCode } = await authUserController.handle({
			body: req.body,
		});

		res.status(statusCode).send(body);
	});
	router.post("/authtoken", async (req, res) => {
		const authTokenRepository = new MongoAuthTokenRepository();
		const authTokenController = new AuthTokenController(authTokenRepository);

		let token = req.headers.token;
		if (Array.isArray(token)) {
			token = token[0];
		}

		const { body, statusCode } = await authTokenController.handle({
			headers: {
				token: token || "",
			},
		});

		res.status(statusCode).send(body);
	});

	return router;
};
