import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
  registerUserBadge,
  GetAllUserBadge,
  GetUserBadgetById,
  updateBadge,
  deleteBadge,
} from "@/service/user_badge_service";
import { registerUserBadgeType } from "@/core/models/user_badge_model";

// Post User Badge
const postUserBadgeController = async (c: Context) => {
  try {
    const data: registerUserBadgeType = await c.req.json();
    const response = await registerUserBadge(data);
    return c.json(
      {
        message: "Successfully created user badge",
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

// Get All User Badges
const getAllUserBadgeController = async (c: Context) => {
  try {
    const badges = await GetAllUserBadge();
    return c.json(
      {
        message: "Successfully retrieved user badges",
        httpStatus: StatusCodes.OK,
        data: badges,
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

// Get User Badge by ID
const getUserBadgeByIdController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const badge = await GetUserBadgetById(id);
    if (!badge) {
      return c.json(
        {
          message: "User badge not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved user badge",
        httpStatus: StatusCodes.OK,
        data: badge,
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

// Update User Badge
const updateUserBadgeController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const data: registerUserBadgeType = await c.req.json();
    const badge = await updateBadge(id, data);
    if (!badge) {
      return c.json(
        {
          message: "User badge not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated user badge",
        httpStatus: StatusCodes.OK,
        data: badge,
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

// Delete User Badge
const deleteUserBadgeController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const badge = await deleteBadge(id);
    if (!badge) {
      return c.json(
        {
          message: "User badge not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted user badge",
        httpStatus: StatusCodes.OK,
        data: badge,
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
  postUserBadgeController,
  getAllUserBadgeController,
  getUserBadgeByIdController,
  updateUserBadgeController,
  deleteUserBadgeController,
};
