import { Router } from "express";
import { GetUsersController } from "./controllers/users/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/users/get-users/mongo-get-users";
import { MongoCreateUserRepository } from "./repositories/users/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/users/create-user/create-user";
import { MongoAuthUserRepository } from "./repositories/users/auth-user/mongo-auth-user";
import { AuthUserController } from "./controllers/users/auth-user/auth-user";
import { MongoAuthTokenRepository } from "./repositories/users/auth-token-user/mongo-auth-token-user";
import { AuthTokenController } from "./controllers/users/auth-token-user/auth-token-user";
import { MongoAddFreeMovieRepository } from "./repositories/movies/add-freemovie/mongo-add-freemovie";
import { AddFreeMovieController } from "./controllers/movies/add-freemovie/add-freemovie";
import { MongoGetFreeMoviesRepository } from "./repositories/movies/get-freemovies/mongo-get-freemovies";
import { GetFreeMoviesController } from "./controllers/movies/get-freemovies/get-freemovies";

export const createRoutes = () => {
	const router = Router();

	router.get("/", (req, res) => {
		res
			.status(200)
			.send(
				"Welcome to Watchous API. We're working on a great documentation for you. It may take a few time."
			);
	});

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

	router.post("/freemovies", async (req, res) => {
		const addFreeMovieRepository = new MongoAddFreeMovieRepository();
		const addFreeMovieController = new AddFreeMovieController(
			addFreeMovieRepository
		);

		const { statusCode, body } = await addFreeMovieController.handle({
			body: req.body,
		});

		res.status(statusCode).send(body);
	});
	router.get("/freemovies", async (req, res) => {
		const getFreeMoviesRepository = new MongoGetFreeMoviesRepository();
		const getFreeMovieController = new GetFreeMoviesController(
			getFreeMoviesRepository
		);

		const { statusCode, body } = await getFreeMovieController.handle();

		res.status(statusCode).send(body);
	});

	return router;
};
