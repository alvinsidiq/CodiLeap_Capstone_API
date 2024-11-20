import { ApiResponse } from "@/core/models/api_model";
import {
  RegisterUserRequestType,
  RegisterUserResponseType,
} from "@/core/models/user_learn_model";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
} from "@/service/user_learn_service";
import { Context } from "hono";
import { StatusCodes } from "http-status-codes";

// post data
const registerUserController = async (c: Context) => {
  const data: RegisterUserRequestType = await c.req.json();
  const response = await registerUser(data);

  return c.json(
    {
      message: "User registered successfully",
      data: response,
    } satisfies ApiResponse<RegisterUserResponseType>,
    StatusCodes.CREATED
  );
};

//get all data
const getUserLearnController = async (c: Context) => {
  try {
    const UserLearn = await getAllUsers();
    return c.json(
      {
        message: "Successfully retrieved users",
        httpStatus: StatusCodes.OK,
        data: UserLearn,
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

// Controller Untuk get id

const getUserLearnByIdController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const userLearn = await getUserById(id);
    if (!userLearn) {
      return c.json(
        {
          message: "User not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully data di temukan",
        httpStatus: StatusCodes.OK,
        data: userLearn,
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

// controller untuk  put

const updateUserController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const data = await c.req.json();
    const UserLearn = await updateUser(id, data);
    if (!UserLearn) {
      return c.json(
        {
          message: "UserLearn not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated UserLearn",
        httpStatus: StatusCodes.OK,
        data: UserLearn,
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

//controller untuk delete

const deleteUserController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const user = await deleteUser(id);
    if (!user) {
      return c.json(
        {
          message: "User not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted user",
        httpStatus: StatusCodes.OK,
        data: user,
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
  deleteUserController,
  getUserLearnByIdController,
  getUserLearnController,
  registerUserController,
  updateUserController,
};
