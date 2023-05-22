import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClientMovies, MongoClientUsers } from "./database/mongo";
import { createRoutes } from "./routes";

const main = async () => {
	dotenv.config();

	const port = process.env.PORT || 3333;
	const app = express();

	app.use(express.json());

	app.use(
		cors({
			origin: ["http://localhost:5173", "https://watchous.vercel.app"],
			exposedHeaders: "Access-Control-Allow-Origin",
		})
	);

	app.use("/", createRoutes());

	await MongoClientUsers.connect();
	await MongoClientMovies.connect();

	app.listen(port, () => console.log(`Everything is ok!`));
};

main();
