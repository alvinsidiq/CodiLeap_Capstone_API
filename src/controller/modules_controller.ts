import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
  AddModules,
  GetAllModules,
  GetModulesById,
  UpdateModules,
  DeleteModules,
} from "@/service/modules_services";
import { AddModulesType } from "@/core/models/modules_model";

// Post Module
const postModuleController = async (c: Context) => {
  try {
    const data: AddModulesType = await c.req.json();
    const response = await AddModules(data);
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
};

// Get All Modules
const getAllModulesController = async (c: Context) => {
  try {
    const modules = await GetAllModules();
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
};

// Get Module by ID
const getModuleByIdController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const module = await GetModulesById(id);
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
};

// Update Module
const updateModuleController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const data = await c.req.json();
    const module = await UpdateModules(id, data);
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
        message: "Successfully updated module",
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
};

// Delete Module
const deleteModuleController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const module = await DeleteModules(id);
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
        message: "Successfully deleted module",
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
};

export {
  postModuleController,
  getAllModulesController,
  getModuleByIdController,
  updateModuleController,
  deleteModuleController,
};
