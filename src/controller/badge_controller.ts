import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { GetAllBadge, GetBadgetById, UpdateBadge, DeleteBadge, AddBadge } from "@/service/badge_service";
import { AddNewBadgeType } from "@/core/models/badge_model";
import userLearn from "@/route/user_learn_route";

// post data
const PostBadgeController = async (c: Context) => {
  try {
    const data: AddNewBadgeType = await c.req.json();
    const response = await AddBadge (data);
    return c.json(
      {
        message: "Succes create post",
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

//get all data
const GetAllBadgeController = async (c: Context) => {
  try {
    const response = await GetAllBadge();
    return c.json(
      {
        message: "Successfully retrieved users",
        httpStatus: StatusCodes.OK,
        data: response,
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

const GetBadgeByIdController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const response = await GetBadgetById(id);
    if (!response) {
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

const UpdateBadgeController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const data = await c.req.json();
    const response = await UpdateBadge(id, data);
    if (!response) {
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
        data: response,
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

const DeleteBadgeController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const response = await DeleteBadge(id);
    if (!response) {
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
        data: response,
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
  GetAllBadgeController,
  GetBadgeByIdController,
  UpdateBadgeController,
  DeleteBadgeController,
  PostBadgeController,
};
