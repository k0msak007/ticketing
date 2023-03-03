import express from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";
import { currentUser, errorHandler, NotFoundError } from "@sgtickets007/common";
import { newOrdersRouter } from "./routes/new";
import { showOrdersRouter } from "./routes/show";
import { indexOrdersRouter } from "./routes";
import { deleteOrdersRouter } from "./routes/delete";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(cookieParser());

app.use(currentUser)

app.use(newOrdersRouter);
app.use(showOrdersRouter);
app.use(indexOrdersRouter);
app.use(deleteOrdersRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
