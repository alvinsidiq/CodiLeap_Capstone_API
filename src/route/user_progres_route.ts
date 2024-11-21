import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { StatusCodes } from "http-status-codes";
import { UserProgres } from "@/core/models/user_progres_model";
import {
  registerUserProgres,
  GetAllUserProgres,
  GetUserProgresById,
  UpdateUserProgres,
  deleteUserProgres,
} from "@/service/user_progres_service";

// Inisialisasi aplikasi Hono
const userProgres = new Hono();

// POST Route - Register a new User Progres
userProgres.post(
  "/",
  zValidator("json", UserProgres), // Validasi input dengan Zod schema
  async (c) => {
    try {
      const data = c.req.valid("json"); // Ambil data yang telah divalidasi
      const response = await registerUserProgres(data); // Mendaftar user progres
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
  }
);

// GET Route - Get all User Progres
userProgres.get("/", async (c) => {
  try {
    const progres = await GetAllUserProgres(); // Ambil semua user progres
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
});

// GET Route - Get User Progres by ID
userProgres.get("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
    const progres = await GetUserProgresById(id); // Cari user progres berdasarkan ID
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
});

// PUT Route - Update User Progres by ID
userProgres.put("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
    const data = await c.req.json(); // Ambil data dari body request
    const progres = await UpdateUserProgres(id, data); // Perbarui user progres
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
});

// DELETE Route - Delete User Progres by ID
userProgres.delete("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
    const progres = await deleteUserProgres(id); // Hapus user progres
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
});

export default userProgres;
