import express from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";
import { currentUser, errorHandler, NotFoundError } from "@sgtickets007/common";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(cookieParser());

app.use(currentUser)
app.use(createChargeRouter)

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
