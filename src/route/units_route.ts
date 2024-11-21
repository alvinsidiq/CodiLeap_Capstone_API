import { Hono } from "hono";
import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { zValidator } from "@hono/zod-validator";
import { Units } from "@/core/models/units_model"; // Importing the Zod validation schema
import {
  AddUnits,
  GetAllUnits,
  GetUnitsById,
  UpdateUnits,
  DeleteLearningPath, // Pastikan nama ini sesuai dengan nama fungsi yang benar
} from "@/service/units_service"; // Mengimpor layer service
import { AddUnitsType } from "@/core/models/units_model"; // Mengimpor tipe data

// Define the Hono route handler for units
const unitRoutes = new Hono();

// Route to create a new Unit
unitRoutes.post(
  "/",
  zValidator("json", Units), // Validate input data using Zod schema
  async (c: Context) => {
    try {
      const data: AddUnitsType = await c.req.json(); // Get data from request body
      const response = await AddUnits(data); // Add unit using service
      return c.json(
        {
          message: "Successfully added unit",
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

// Route to get all Units
unitRoutes.get("/", async (c: Context) => {
  try {
    const units = await GetAllUnits(); // Get all units using service
    return c.json(
      {
        message: "Successfully retrieved all units",
        httpStatus: StatusCodes.OK,
        data: units,
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

// Route to get a Unit by ID
unitRoutes.get("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get ID from URL parameters
    const unit = await GetUnitsById(id); // Get unit by ID using service
    if (!unit) {
      return c.json(
        {
          message: "Unit not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved unit",
        httpStatus: StatusCodes.OK,
        data: unit,
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

// Route to update a Unit by ID
unitRoutes.put("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get ID from URL parameters
    const data = await c.req.json(); // Get updated data from request body
    const updatedUnit = await UpdateUnits(id, data); // Update unit using service
    if (!updatedUnit) {
      return c.json(
        {
          message: "Unit not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated unit",
        httpStatus: StatusCodes.OK,
        data: updatedUnit,
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

// Route to delete a Unit by ID
unitRoutes.delete("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get ID from URL parameters
    const deletedUnit = await DeleteLearningPath(id); // Delete unit by ID using service
    if (!deletedUnit) {
      return c.json(
        {
          message: "Unit not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted unit",
        httpStatus: StatusCodes.OK,
        data: deletedUnit,
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

export default unitRoutes;
