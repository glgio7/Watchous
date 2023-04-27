import express from "express";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
	res.send("<h1>Hello world!</h1>");
});

app.use("/api", router);

app.listen(port, () => console.log(`Everything is ok!`));
