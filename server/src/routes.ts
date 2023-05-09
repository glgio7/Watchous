import { Router } from "express";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";

export const createRoutes = () => {
  const router = Router();

  router.get("/users", async (req, res) => {
    const getUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(getUsersRepository);

    const response = await getUsersController.handle();

    res.send(response.body).status(response.statusCode);
  });

  router.post("/users", async (req, res) => {
    const createUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(createUserRepository);

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.send(body).status(statusCode);
  });

  return router;
};
