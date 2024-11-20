import { Hono } from "hono";
import {
  postModuleController,
  getAllModulesController,
  getModuleByIdController,
  updateModuleController,
  deleteModuleController,
} from "@/controller/modules_controller";
import { zValidator } from "@hono/zod-validator";
import { Modules } from "@/core/models/modules_model";

// Define the Hono route handler
const modulesRoutes = new Hono();

// Route to create a new Module
modulesRoutes.post(
  "/",
  zValidator("json", Modules), // Validate input data using Zod schema
  postModuleController
);

// Route to get all Modules
modulesRoutes.get("/", getAllModulesController);

// Route to get a Module by ID
modulesRoutes.get("/:id", getModuleByIdController);

// Route to update a Module by ID
modulesRoutes.put("/:id", updateModuleController);

// Route to delete a Module by ID
modulesRoutes.delete("/:id", deleteModuleController);

export default modulesRoutes;
