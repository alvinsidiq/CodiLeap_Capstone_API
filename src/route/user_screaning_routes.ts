import { Hono } from "hono";
import {
  postUserScreaningResourceController,
  getAllUserScreaningResourceController,
  getUserScreaningResourceByIdController,
  updateUserScreaningResourceController,
  deleteUserScreaningResourceController,
} from "@/controller/user_screaning_resource_controller";
import { zValidator } from "@hono/zod-validator";
import { UserScreaningResource } from "@/core/models/user_screaning_resource";

// Define the Hono route handler
const userScreaningResource = new Hono();

// Route to create a new User Screaning Resource
userScreaningResource.post(
  "/",
  zValidator("json", UserScreaningResource), // Validate input data using Zod schema
  postUserScreaningResourceController
);

// Route to get all User Screaning Resources
userScreaningResource.get("/", getAllUserScreaningResourceController);

// Route to get a User Screaning Resource by ID
userScreaningResource.get("/:id", getUserScreaningResourceByIdController);

// Route to update a User Screaning Resource by ID
userScreaningResource.put("/:id", updateUserScreaningResourceController);

// Route to delete a User Screaning Resource by ID
userScreaningResource.delete("/:id", deleteUserScreaningResourceController);

export default userScreaningResource;
