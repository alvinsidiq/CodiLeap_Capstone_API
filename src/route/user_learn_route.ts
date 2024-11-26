import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "@/core/models/api_model";
import { RegisterUserRequest, RegisterUserResponseType } from "@/core/models/user_model";
import { errorValidationParser as validateErrorHandler } from "@/middleware/errorValidationParser";
import { registerUser, getAllUsers, getUserById, updateUser, deleteUser } from "@/service/user_learn_service";

// Inisialisasi Hono app
const userLearn = new Hono();

// POST Route - Register a new User
userLearn.post(
  "/",
  zValidator("json", RegisterUserRequest, validateErrorHandler), // validasi input
  async (c) => {
    try {
      const data = c.req.valid("json"); // Ambil data yang telah divalidasi
      const response = await registerUser(data); // Daftarkan user dengan service
      return c.json(
        {
          message: "User registered successfully",
          data: response,
        } satisfies ApiResponse<RegisterUserResponseType>,
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

// GET Route - Retrieve all users
userLearn.get("/", async (c) => {
  try {
    const users = await getAllUsers(); // Ambil semua user dengan service
    return c.json(
      {
        message: "Successfully retrieved users",
        httpStatus: StatusCodes.OK,
        data: users,
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

// GET Route - Get user by ID
userLearn.get("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil id dari parameter URL
    const user = await getUserById(id); // Ambil user berdasarkan id
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
        message: "User found successfully",
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
});

// PUT Route - Update user by ID
userLearn.put("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil id dari parameter URL
    const data = await c.req.json(); // Ambil data dari request body
    const updatedUser = await updateUser(id, data); // Perbarui user menggunakan service
    if (!updatedUser) {
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
        message: "Successfully updated user",
        httpStatus: StatusCodes.OK,
        data: updatedUser,
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

// DELETE Route - Delete user by ID
userLearn.delete("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil id dari parameter URL
    const user = await deleteUser(id); // Hapus user berdasarkan id
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
});

export default userLearn;
