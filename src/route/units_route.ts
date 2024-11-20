import { Hono } from "hono";
import {
  postUnitController,
  getAllUnitsController,
  getUnitByIdController,
  updateUnitController,
  deleteUnitController,
} from "@/controller/units_controller";
import { zValidator } from "@hono/zod-validator";
import { Units } from "@/core/models/units_model"; // Importing the Zod validation schema

// Define the Hono route handler
const unitRoutes = new Hono();

// Route to create a new Unit
unitRoutes.post(
  "/",
  zValidator("json", Units), // Validate input data using Zod schema
  postUnitController
);

// Route to get all Units
unitRoutes.get("/", getAllUnitsController);

// Route to get a Unit by ID
unitRoutes.get("/:id", getUnitByIdController);

// Route to update a Unit by ID
unitRoutes.put("/:id", updateUnitController);

// Route to delete a Unit by ID
unitRoutes.delete("/:id", deleteUnitController);

export default unitRoutes;
