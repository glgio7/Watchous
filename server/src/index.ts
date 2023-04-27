import express from "express";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
	res.send("<h1>Hello world!</h1>");
});

app.listen(port, () => console.log(`Everything is ok!`));
