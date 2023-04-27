import express from "express";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
	alert("Api em construção");
	res.status(204);
});

app.use("/api", router);

app.listen(port, () => console.log(`Everything is ok!`));
