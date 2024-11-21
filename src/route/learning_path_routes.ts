import { Hono } from "hono";
import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
  AddLearningPath,
  GetAllLearningPath,
  GetLearningPathById,
  UpdateLearningPath,
  DeleteLearningPath,
} from "@/service/learning_path_service";
import { AddLearningPathType, UpdateLearningPathType } from "@/core/models/learning_path_model";
import { LearningPath } from "@/core/models/learning_path_model"; // skema validasi Zod
import { zValidator } from "@hono/zod-validator";

// Route handler untuk Learning Path

const learningPathRoutes = new Hono();

// Route POST untuk menambahkan Learning Path
learningPathRoutes.post(
  "/",
  zValidator("json", LearningPath), // Validasi input menggunakan skema Zod
  async (c: Context) => {
    try {
      const data: AddLearningPathType = await c.req.json(); // Ambil data dari request body
      const response = await AddLearningPath(data); // Panggil service untuk menambah data

      return c.json(
        {
          message: "Successfully created new learning path", // Pesan sukses
          status: "CREATED",
          data: response, // Data yang telah ditambahkan
        },
        StatusCodes.CREATED
      );
    } catch (error: any) {
      return c.json(
        {
          message: error.message, // Pesan error
          status: "INTERNAL_SERVER_ERROR",
          data: null,
        },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
);

// Route GET untuk mengambil semua Learning Paths
learningPathRoutes.get("/", async (c: Context) => {
  try {
    const response = await GetAllLearningPath(); // Panggil service untuk mengambil semua data

    return c.json(
      {
        message: "Successfully retrieved all learning paths", // Pesan sukses
        status: "OK",
        data: response, // Data Learning Path
      },
      StatusCodes.OK
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message, // Pesan error
        status: "INTERNAL_SERVER_ERROR",
        data: null,
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
});

// Route GET untuk mengambil Learning Path berdasarkan ID
learningPathRoutes.get("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
    const response = await GetLearningPathById(id); // Panggil service untuk mengambil data berdasarkan ID

    if (!response) {
      return c.json(
        {
          message: "Learning path not found", // Pesan jika data tidak ditemukan
          status: "NOT_FOUND",
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }

    return c.json(
      {
        message: "Successfully retrieved learning path by ID", // Pesan sukses
        status: "OK",
        data: response, // Data Learning Path
      },
      StatusCodes.OK
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message, // Pesan error
        status: "INTERNAL_SERVER_ERROR",
        data: null,
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
});

// Route PUT untuk memperbarui Learning Path berdasarkan ID
learningPathRoutes.put("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
    const data: UpdateLearningPathType = await c.req.json(); // Ambil data dari request body

    const response = await UpdateLearningPath(id, data); // Panggil service untuk memperbarui data

    if (!response) {
      return c.json(
        {
          message: "Learning path not found", // Pesan jika data tidak ditemukan
          status: "NOT_FOUND",
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }

    return c.json(
      {
        message: "Successfully updated learning path", // Pesan sukses
        status: "OK",
        data: response, // Data Learning Path yang diperbarui
      },
      StatusCodes.OK
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message, // Pesan error
        status: "INTERNAL_SERVER_ERROR",
        data: null,
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
});

// Route DELETE untuk menghapus Learning Path berdasarkan ID
learningPathRoutes.delete("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil ID dari parameter URL
    const response = await DeleteLearningPath(id); // Panggil service untuk menghapus data

    if (!response) {
      return c.json(
        {
          message: "Learning path not found", // Pesan jika data tidak ditemukan
          status: "NOT_FOUND",
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }

    return c.json(
      {
        message: "Successfully deleted learning path", // Pesan sukses
        status: "OK",
        data: null,
      },
      StatusCodes.OK
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message, // Pesan error
        status: "INTERNAL_SERVER_ERROR",
        data: null,
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
});

export default learningPathRoutes;
