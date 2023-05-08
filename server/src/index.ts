import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();
const router = Router();

router.get("/api", (req, res) => {
	res.status(200);
	res.send("<h1>/api</h1>");
});

app.use(cors());
app.use("/", router);
app.listen(port, () => console.log(`Everything is ok!`));
