import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
  registerUserModulProgres,
  GetAllUserModulProgres,
  GetUserModulProgresById,
  UpdateUserModulProgres,
  deleteUserModulProgres,
} from "@/service/user_modul_progres_service";
import { registerUserModulProgresType } from "@/core/models/user_modul_progres_model";

// Post User Modul Progres
const postUserModulProgresController = async (c: Context) => {
  try {
    const data: registerUserModulProgresType = await c.req.json();
    const response = await registerUserModulProgres(data);
    return c.json(
      {
        message: "Successfully created user module progress",
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

// Get All User Modul Progres
const getAllUserModulProgresController = async (c: Context) => {
  try {
    const progres = await GetAllUserModulProgres();
    return c.json(
      {
        message: "Successfully retrieved user module progress",
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

// Get User Modul Progres by ID
const getUserModulProgresByIdController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const progres = await GetUserModulProgresById(id);
    if (!progres) {
      return c.json(
        {
          message: "User module progress not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved user module progress",
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

// Update User Modul Progres
const updateUserModulProgresController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const data: registerUserModulProgresType = await c.req.json();
    const progres = await UpdateUserModulProgres(id, data);
    if (!progres) {
      return c.json(
        {
          message: "User module progress not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated user module progress",
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

// Delete User Modul Progres
const deleteUserModulProgresController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const progres = await deleteUserModulProgres(id);
    if (!progres) {
      return c.json(
        {
          message: "User module progress not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted user module progress",
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
  postUserModulProgresController,
  getAllUserModulProgresController,
  getUserModulProgresByIdController,
  updateUserModulProgresController,
  deleteUserModulProgresController,
};
