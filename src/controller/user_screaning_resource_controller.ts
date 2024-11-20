import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
  registerUserScreaning,
  GetAllUserScreaning,
  GetUserScreaningById,
  UpdateUserScreaning,
  DeleteUserScreaning,
} from "@/service/user_screaning_resource_service";
import { registerUserScreaningResourceType } from "@/core/models/user_screaning_resource";

// Post User Screaning Resource
const postUserScreaningResourceController = async (c: Context) => {
  try {
    const data: registerUserScreaningResourceType = await c.req.json();
    const response = await registerUserScreaning(data);
    return c.json(
      {
        message: "Successfully added user screaning resource",
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

// Get All User Screaning Resources
const getAllUserScreaningResourceController = async (c: Context) => {
  try {
    const resources = await GetAllUserScreaning();
    return c.json(
      {
        message: "Successfully retrieved all user screaning resources",
        httpStatus: StatusCodes.OK,
        data: resources,
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

// Get User Screaning Resource by ID
const getUserScreaningResourceByIdController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const resource = await GetUserScreaningById(id);
    if (!resource) {
      return c.json(
        {
          message: "User screaning resource not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved user screaning resource",
        httpStatus: StatusCodes.OK,
        data: resource,
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

// Update User Screaning Resource
const updateUserScreaningResourceController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const data = await c.req.json();
    const resource = await UpdateUserScreaning(id, data);
    if (!resource) {
      return c.json(
        {
          message: "User screaning resource not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated user screaning resource",
        httpStatus: StatusCodes.OK,
        data: resource,
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

// Delete User Screaning Resource
const deleteUserScreaningResourceController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const resource = await DeleteUserScreaning(id);
    if (!resource) {
      return c.json(
        {
          message: "User screaning resource not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted user screaning resource",
        httpStatus: StatusCodes.OK,
        data: resource,
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
  postUserScreaningResourceController,
  getAllUserScreaningResourceController,
  getUserScreaningResourceByIdController,
  updateUserScreaningResourceController,
  deleteUserScreaningResourceController,
};
