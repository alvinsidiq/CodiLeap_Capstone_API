import { Hono } from "hono";
import {
  postUserModulProgresController,
  getAllUserModulProgresController,
  getUserModulProgresByIdController,
  updateUserModulProgresController,
  deleteUserModulProgresController,
} from "@/controller/user_modul_progres_controller";
import { zValidator } from "@hono/zod-validator";
import { UserModulProgres } from "@/core/models/user_modul_progres_model";

const userModulProgres = new Hono();

userModulProgres.post(
  "/",
  zValidator("json", UserModulProgres), // Validasi input menggunakan Zod schema
  postUserModulProgresController
);

userModulProgres.get("/", getAllUserModulProgresController);

userModulProgres.get("/:id", getUserModulProgresByIdController);

userModulProgres.put("/:id", updateUserModulProgresController);

userModulProgres.delete("/:id", deleteUserModulProgresController);

export default userModulProgres;
