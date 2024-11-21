import { Hono } from "hono";
import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { zValidator } from "@hono/zod-validator";
import { Modules } from "@/core/models/modules_model"; // Importing Zod schema for validation
import {
  AddModules,
  GetAllModules,
  GetModulesById,
  UpdateModules,
  DeleteModules,
} from "@/service/modules_services"; // Importing service functions

// Define the Hono route handler for modules
const modulesRoutes = new Hono();

// Route for creating a new Module
modulesRoutes.post(
  "/",
  zValidator("json", Modules), // Validate input data using Zod schema
  async (c: Context) => {
    try {
      const data = await c.req.json(); // Get request body
      const response = await AddModules(data); // Add new module using service function
      return c.json(
        {
          message: "Successfully added module",
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

// Route for retrieving all Modules
modulesRoutes.get("/", async (c: Context) => {
  try {
    const modules = await GetAllModules(); // Get all modules using service function
    return c.json(
      {
        message: "Successfully retrieved all modules",
        httpStatus: StatusCodes.OK,
        data: modules,
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

// Route for retrieving a Module by ID
modulesRoutes.get("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get module ID from URL parameter
    const module = await GetModulesById(id); // Get module by ID using service function
    if (!module) {
      return c.json(
        {
          message: "Module not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved module",
        httpStatus: StatusCodes.OK,
        data: module,
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

// Route for updating a Module by ID
modulesRoutes.put("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get module ID from URL parameter
    const data = await c.req.json(); // Get updated module data from request body
    const updatedModule = await UpdateModules(id, data); // Update module using service function
    if (!updatedModule) {
      return c.json(
        {
          message: "Module not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated module",
        httpStatus: StatusCodes.OK,
        data: updatedModule,
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

// Route for deleting a Module by ID
modulesRoutes.delete("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get module ID from URL parameter
    const deletedModule = await DeleteModules(id); // Delete module using service function
    if (!deletedModule) {
      return c.json(
        {
          message: "Module not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted module",
        httpStatus: StatusCodes.OK,
        data: deletedModule,
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

export default modulesRoutes;
