import { Hono } from "hono";
import {
  GetAllBadgeController,
  GetBadgeByIdController,
  UpdateBadgeController,
  DeleteBadgeController,
  PostBadgeController,
} from "@/controller/badge_controller";
import { zValidator } from "@hono/zod-validator";
import { Badge } from "@/core/models/badge_model";

const badge = new Hono();

badge.post(
  "/",
  zValidator("json", Badge), // Validasi menggunakan Zod schema
  PostBadgeController
);

badge.get("/", GetAllBadgeController);

badge.get("/:id", GetBadgeByIdController);

badge.put("/:id", UpdateBadgeController);

badge.delete("/:id", DeleteBadgeController);

export default badge;
