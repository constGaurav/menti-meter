import dotenv from "dotenv";
import express from "express";
import router from "./routers";
import cookieParser from "cookie-parser";
import { config } from "./config";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
});
