import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import todo from "./todo";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/todo", todo);

export default routes;
