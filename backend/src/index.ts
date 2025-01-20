import dotenv from "dotenv";
import express from "express";
import router from "./routers";
import { config } from "./config";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", router);

app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
});
