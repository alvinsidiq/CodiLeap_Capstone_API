import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
  AddLearningPath,
  GetAllLearningPath,
  GetLearningPathById,
  UpdateLearningPath,
  DeleteLearningPath,
} from "@/service/learning_path_service"; // Mengimpor layer service
import { AddLearningPathType } from "@/core/models/learning_path_model"; // Mengimpor tipe data

// Controller untuk menambahkan Learning Path
const postLearningPathController = async (c: Context) => {
  try {
    const data: AddLearningPathType = await c.req.json(); // Mendapatkan data dari body request
    const response = await AddLearningPath(data); // Menambahkan Learning Path menggunakan service
    return c.json(
      {
        message: "Successfully added learning path",
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

// Controller untuk mengambil semua Learning Path
const getAllLearningPathsController = async (c: Context) => {
  try {
    const learningPaths = await GetAllLearningPath(); // Mengambil semua Learning Path menggunakan service
    return c.json(
      {
        message: "Successfully retrieved all learning paths",
        httpStatus: StatusCodes.OK,
        data: learningPaths,
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

// Controller untuk mengambil Learning Path berdasarkan ID
const getLearningPathByIdController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Mendapatkan id dari parameter URL
    const learningPath = await GetLearningPathById(id); // Mengambil Learning Path berdasarkan ID menggunakan service
    if (!learningPath) {
      return c.json(
        {
          message: "Learning Path not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved learning path",
        httpStatus: StatusCodes.OK,
        data: learningPath,
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

// Controller untuk memperbarui Learning Path
const updateLearningPathController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Mendapatkan id dari parameter URL
    const data = await c.req.json(); // Mendapatkan data terbaru dari body request
    const updatedLearningPath = await UpdateLearningPath(id, data); // Memperbarui Learning Path menggunakan service
    if (!updatedLearningPath) {
      return c.json(
        {
          message: "Learning Path not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated learning path",
        httpStatus: StatusCodes.OK,
        data: updatedLearningPath,
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

// Controller untuk menghapus Learning Path
const deleteLearningPathController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Mendapatkan id dari parameter URL
    const deletedLearningPath = await DeleteLearningPath(id); // Menghapus Learning Path berdasarkan ID menggunakan service
    if (!deletedLearningPath) {
      return c.json(
        {
          message: "Learning Path not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted learning path",
        httpStatus: StatusCodes.OK,
        data: deletedLearningPath,
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
  postLearningPathController,
  getAllLearningPathsController,
  getLearningPathByIdController,
  updateLearningPathController,
  deleteLearningPathController,
};
