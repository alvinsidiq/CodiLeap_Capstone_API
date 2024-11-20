import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
  registerUserProgres,
  GetAllUserProgres,
  GetUserProgresById,
  UpdateUserProgres,
  deleteUserProgres,
} from "@/service/user_progres_service";
import { registerUserProgresType } from "@/core/models/user_progres_model";

// Post User Progres
const postUserProgresController = async (c: Context) => {
  try {
    const data: registerUserProgresType = await c.req.json();
    const response = await registerUserProgres(data);
    return c.json(
      {
        message: "Successfully created user progress",
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

// Get All User Progres
const getAllUserProgresController = async (c: Context) => {
  try {
    const progres = await GetAllUserProgres();
    return c.json(
      {
        message: "Successfully retrieved user progress",
        httpStatus: StatusCodes.OK,
        data: progres,
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

// Get User Progres by ID
const getUserProgresByIdController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const progres = await GetUserProgresById(id);
    if (!progres) {
      return c.json(
        {
          message: "User progress not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved user progress",
        httpStatus: StatusCodes.OK,
        data: progres,
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

// Update User Progres
const updateUserProgresController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const data: registerUserProgresType = await c.req.json();
    const progres = await UpdateUserProgres(id, data);
    if (!progres) {
      return c.json(
        {
          message: "User progress not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated user progress",
        httpStatus: StatusCodes.OK,
        data: progres,
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

// Delete User Progres
const deleteUserProgresController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const progres = await deleteUserProgres(id);
    if (!progres) {
      return c.json(
        {
          message: "User progress not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted user progress",
        httpStatus: StatusCodes.OK,
        data: progres,
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
  postUserProgresController,
  getAllUserProgresController,
  getUserProgresByIdController,
  updateUserProgresController,
  deleteUserProgresController,
};
