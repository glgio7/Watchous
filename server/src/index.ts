import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "./database/mongo";
import { createRoutes } from "./routes";

const main = async () => {
	dotenv.config();

	const port = process.env.PORT || 3333;
	const app = express();

	app.use(express.json());
	app.use(cors({ origin: "*" }));
	app.use("/", createRoutes());

	await MongoClient.connect();

	app.listen(port, () => console.log(`Everything is ok!`));
};

main();
