import {
  getUserController,
  loginUserController,
} from "@/controller/user_controller";
import { loginUserRequest } from "@/core/models/user_learn_model";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const userRoutes = new Hono();

userRoutes.get("/", getUserController);
userRoutes.post(
  "/login",
  zValidator("json", loginUserRequest),
  loginUserController
);

export default userRoutes;
