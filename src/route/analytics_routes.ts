import { Hono } from "hono";
import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { zValidator } from "@hono/zod-validator";
import { Analytics } from "@/core/models/analytics_model"; // Importing the Zod validation schema
import {
  AddAnalytics,
  GetAllAnalytics,
  GetAnalyticsById,
  UpdateAnalytics,
  DeleteAnalytics,
} from "@/service/analytics_service"; // Import service layer

const analytics = new Hono();

// Route for creating a new Analytics entry
analytics.post(
  "/",
  zValidator("json", Analytics), // Validate input data using Zod schema
  async (c: Context) => {
    try {
      const data = await c.req.json(); // Get request body
      const response = await AddAnalytics(data); // Add analytics entry using service function
      return c.json(
        {
          message: "Successfully created analytics entry",
          httpStatus: StatusCodes.CREATED,
          data: response,
        },
        StatusCodes.CREATED
      );
    } catch (error: any) {
      return c.json(
        {
          message: error.message,
          httpStatus: StatusCodes.INTERNAL_SERVER_ERROR,
          data: null,
        },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
);

// Route for retrieving all Analytics entries
analytics.get("/", async (c: Context) => {
  try {
    const analyticsEntries = await GetAllAnalytics(); // Get all analytics entries
    return c.json(
      {
        message: "Successfully retrieved analytics entries",
        httpStatus: StatusCodes.OK,
        data: analyticsEntries,
      },
      StatusCodes.OK
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message,
        httpStatus: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
});

// Route for retrieving an Analytics entry by ID
analytics.get("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get analytics entry ID from route param
    const analyticsEntry = await GetAnalyticsById(id); // Get analytics entry by ID using service function
    if (!analyticsEntry) {
      return c.json(
        {
          message: "Analytics entry not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved analytics entry",
        httpStatus: StatusCodes.OK,
        data: analyticsEntry,
      },
      StatusCodes.OK
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message,
        httpStatus: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
});

// Route for updating an Analytics entry by ID
analytics.put("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get analytics entry ID from route param
    const data = await c.req.json(); // Get updated analytics entry data from request body
    const updatedAnalytics = await UpdateAnalytics(id, data); // Update analytics entry using service function
    if (!updatedAnalytics) {
      return c.json(
        {
          message: "Analytics entry not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated analytics entry",
        httpStatus: StatusCodes.OK,
        data: updatedAnalytics,
      },
      StatusCodes.OK
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message,
        httpStatus: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
});

// Route for deleting an Analytics entry by ID
analytics.delete("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get analytics entry ID from route param
    const deletedAnalytics = await DeleteAnalytics(id); // Delete analytics entry using service function
    if (!deletedAnalytics) {
      return c.json(
        {
          message: "Analytics entry not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted analytics entry",
        httpStatus: StatusCodes.OK,
        data: deletedAnalytics,
      },
      StatusCodes.OK
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message,
        httpStatus: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
});

export default analytics;
