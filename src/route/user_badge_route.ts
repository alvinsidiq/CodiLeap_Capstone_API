import { Hono } from "hono";
import {
  postUserBadgeController,
  getAllUserBadgeController,
  getUserBadgeByIdController,
  updateUserBadgeController,
  deleteUserBadgeController,
} from "@/controller/user_badge_controller";
import { zValidator } from "@hono/zod-validator";
import { UserBadge } from "@/core/models/user_badge_model";

const userBadge = new Hono();

userBadge.post(
  "/",
  zValidator("json", UserBadge), // Validasi input menggunakan Zod schema
  postUserBadgeController
);

userBadge.get("/", getAllUserBadgeController);

userBadge.get("/:id", getUserBadgeByIdController);

userBadge.put("/:id", updateUserBadgeController);

userBadge.delete("/:id", deleteUserBadgeController);

export default userBadge;
