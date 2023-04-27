import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;

const app = express();
const router = express.Router();

const users = [
	{
		name: "Alice",
		email: "alice@example.com",
		age: 27,
		city: "New York",
	},
	{
		name: "John Doe",
		email: "bob@example.com",
		age: 34,
		city: "San Francisco",
	},
	{
		name: "Jane Doe",
		email: "charlie@example.com",
		age: 19,
		city: "Los Angeles",
	},
];

router.get("/", (req, res) => {
	res.status(204);
});

router.get("/users", (req, res) => {
	res.status(200).json(users);
});

app.use(cors());
app.use("/api", router);

app.listen(port, () => console.log(`Everything is ok!`));
