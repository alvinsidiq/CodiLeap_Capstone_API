import { Hono } from "hono";
import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
 
  GetAllLearningPath,
  GetLearningPathById,
 
} from "@/service/learning_path_service";

const learningPath = new Hono();


learningPath.get("/", async (c: Context) => {
  try {
    const response = await GetAllLearningPath(); // Ambil semua data dari service
    return c.json(
      {
        message: "Successfully retrieved all learning paths",
        status: "SUCCESS",
        httpStatus: StatusCodes.OK,
        data: response, // Semua data Learning Paths
      },
      StatusCodes.OK
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message || "Failed to retrieve learning paths",
        status: "FAILED",
        httpStatus: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
});

// Route GET untuk mengambil Learning Path berdasarkan ID
learningPath.get("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Ambil ID dari URL
    const response = await GetLearningPathById(id);

    if (!response) {
      return c.json(
        {
          message: "Learning path not found",
          status: "FAILED",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }

    return c.json(
      {
        message: "Successfully retrieved learning path",
        status: "SUCCESS",
        httpStatus: StatusCodes.OK,
        data: response,
      },
      StatusCodes.OK
    );
  } catch (error: any) {
    return c.json(
      {
        message: error.message || "Failed to retrieve learning path",
        status: "Bad Request",
        error: "invalid ID",
        errors: null,
        httpStatus: StatusCodes.UNAUTHORIZED,
        
      },
      StatusCodes.UNAUTHORIZED
    );
  }
});



export default learningPath;
