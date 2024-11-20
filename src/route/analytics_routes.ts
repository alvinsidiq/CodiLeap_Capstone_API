import { Hono } from "hono";
import {
  postAnalyticsController,
  getAllAnalyticsController,
  getAnalyticsByIdController,
  updateAnalyticsController,
  deleteAnalyticsController,
} from "@/controller/analytics_controller";
import { zValidator } from "@hono/zod-validator";
import { Analytics } from "@/core/models/analytics_model";

const analytics = new Hono();

// Route for creating a new Analytics entry
analytics.post(
  "/",
  zValidator("json", Analytics), // Validate input data using Zod schema
  postAnalyticsController
);

// Route for retrieving all Analytics entries
analytics.get("/", getAllAnalyticsController);

// Route for retrieving an Analytics entry by ID
analytics.get("/:id", getAnalyticsByIdController);

// Route for updating an Analytics entry by ID
analytics.put("/:id", updateAnalyticsController);

// Route for deleting an Analytics entry by ID
analytics.delete("/:id", deleteAnalyticsController);

export default analytics;
