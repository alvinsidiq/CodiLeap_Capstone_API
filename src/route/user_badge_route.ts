import { Hono } from "hono";
import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { zValidator } from "@hono/zod-validator";
import { UserBadge } from "@/core/models/user_badge_model"; // Importing the Zod validation schema
import {
  registerUserBadge,
  GetAllUserBadge,
  GetUserBadgetById,
  updateBadge,
  deleteBadge,
} from "@/service/user_badge_service"; // Mengimpor layer service
import { registerUserBadgeType } from "@/core/models/user_badge_model"; // Mengimpor tipe data

// Define the Hono route handler for user badges
const userBadge = new Hono();

// Route to create a new User Badge
userBadge.post(
  "/",
  zValidator("json", UserBadge), // Validate input using Zod schema
  async (c: Context) => {
    try {
      const data: registerUserBadgeType = await c.req.json(); // Get data from request body
      const response = await registerUserBadge(data); // Register user badge using service
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
  }
);

// Route to get all User Badges
userBadge.get("/", async (c: Context) => {
  try {
    const badges = await GetAllUserBadge(); // Get all user badges using service
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
});

// Route to get a User Badge by ID
userBadge.get("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get ID from URL parameters
    const badge = await GetUserBadgetById(id); // Get user badge by ID using service
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
});

// Route to update a User Badge by ID
userBadge.put("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get ID from URL parameters
    const data: registerUserBadgeType = await c.req.json(); // Get updated data from request body
    const badge = await updateBadge(id, data); // Update user badge using service
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
});

// Route to delete a User Badge by ID
userBadge.delete("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get ID from URL parameters
    const badge = await deleteBadge(id); // Delete user badge by ID using service
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
});

export default userBadge;
