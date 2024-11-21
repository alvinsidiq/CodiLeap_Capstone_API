import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { StatusCodes } from "http-status-codes";
import { UserScreaningResource } from "@/core/models/user_screaning_resource";
import {
  registerUserScreaning,
  GetAllUserScreaning,
  GetUserScreaningById,
  UpdateUserScreaning,
  DeleteUserScreaning,
} from "@/service/user_screaning_resource_service";

// Inisialisasi aplikasi Hono
const userScreaningResource = new Hono();

// POST Route - Register a new User Screaning Resource
userScreaningResource.post(
  "/",
  zValidator("json", UserScreaningResource), // Validasi input menggunakan schema Zod
  async (c) => {
    try {
      const data = c.req.valid("json"); // Ambil data yang sudah divalidasi
      const response = await registerUserScreaning(data); // Mendaftar sumber daya screaning user
      return c.json(
        {
          message: "Successfully added user screening resource",
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

// GET Route - Get all User Screaning Resources
userScreaningResource.get("/", async (c) => {
  try {
    const resources = await GetAllUserScreaning(); // Ambil semua sumber daya screaning user
    return c.json(
      {
        message: "Successfully retrieved all user screening resources",
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
});

// GET Route - Get User Screaning Resource by ID
userScreaningResource.get("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
    const resource = await GetUserScreaningById(id); // Cari sumber daya screaning berdasarkan ID
    if (!resource) {
      return c.json(
        {
          message: "User screening resource not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved user screening resource",
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
});

// PUT Route - Update User Screaning Resource by ID
userScreaningResource.put("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
    const data = await c.req.json(); // Ambil data dari body request
    const resource = await UpdateUserScreaning(id, data); // Perbarui sumber daya screaning
    if (!resource) {
      return c.json(
        {
          message: "User screening resource not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated user screening resource",
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
});

// DELETE Route - Delete User Screaning Resource by ID
userScreaningResource.delete("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
    const resource = await DeleteUserScreaning(id); // Hapus sumber daya screaning berdasarkan ID
    if (!resource) {
      return c.json(
        {
          message: "User screening resource not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted user screening resource",
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
});

export default userScreaningResource;
