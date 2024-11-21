import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { StatusCodes } from "http-status-codes";
import { UserModulProgres } from "@/core/models/user_modul_progres_model";
import {
  registerUserModulProgres,
  GetAllUserModulProgres,
  GetUserModulProgresById,
  UpdateUserModulProgres,
  deleteUserModulProgres,
} from "@/service/user_modul_progres_service";

// Inisialisasi aplikasi Hono
const userModulProgres = new Hono();

// POST Route - Register a new User Modul Progres
userModulProgres.post(
  "/",
  zValidator("json", UserModulProgres), // Validasi input menggunakan Zod schema
  async (c) => {
    try {
      const data = c.req.valid("json"); // Ambil data yang telah divalidasi
      const response = await registerUserModulProgres(data); // Mendaftar user modul progres
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
  }
);

// GET Route - Get all User Modul Progres
userModulProgres.get("/", async (c) => {
  try {
    const progres = await GetAllUserModulProgres(); // Ambil semua user modul progres
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
});

// GET Route - Get User Modul Progres by ID
userModulProgres.get("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
    const progres = await GetUserModulProgresById(id); // Cari user modul progres berdasarkan ID
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
});

// PUT Route - Update User Modul Progres by ID
userModulProgres.put("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
    const data = await c.req.json(); // Ambil data dari body request
    const progres = await UpdateUserModulProgres(id, data); // Perbarui user modul progres
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
});

// DELETE Route - Delete User Modul Progres by ID
userModulProgres.delete("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
    const progres = await deleteUserModulProgres(id); // Hapus user modul progres
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
});

export default userModulProgres;
