import { Hono } from "hono";
import {
  postUserProgresController,
  getAllUserProgresController,
  getUserProgresByIdController,
  updateUserProgresController,
  deleteUserProgresController,
} from "@/controller/user_progres_controller";
import { zValidator } from "@hono/zod-validator";
import { UserProgres } from "@/core/models/user_progres_model";

const userProgres = new Hono();

userProgres.post(
  "/",
  zValidator("json", UserProgres), // Validasi input dengan Zod schema
  postUserProgresController
);

userProgres.get("/", getAllUserProgresController);

userProgres.get("/:id", getUserProgresByIdController);

userProgres.put("/:id", updateUserProgresController);

userProgres.delete("/:id", deleteUserProgresController);

export default userProgres;
