import { Hono } from "hono";
import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { zValidator } from "@hono/zod-validator";
import { Lesson } from "@/core/models/lesson_model"; // Importing the Zod validation schema
import {
  AddLesson,
  GetAllLesson,
  GetLessonById,
  UpdateLesson,
  DeleteLesson, // Updated function name
} from "@/service/lesson_service"; // Import service layer

// Define the Hono route handler
const lessonRoutes = new Hono();

// Route to create a new Lesson
lessonRoutes.post(
  "/",
  zValidator("json", Lesson), // Validate input data using Zod schema
  async (c: Context) => {
    try {
      const data = await c.req.json(); // Get request body
      const response = await AddLesson(data); // Add lesson using service function
      return c.json(
        {
          message: "Successfully added lesson",
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

// Route to get all Lessons
lessonRoutes.get("/", async (c: Context) => {
  try {
    const lessons = await GetAllLesson(); // Get all lessons using service function
    return c.json(
      {
        message: "Successfully retrieved all lessons",
        httpStatus: StatusCodes.OK,
        data: lessons,
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

// Route to get a Lesson by ID
lessonRoutes.get("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get lesson ID from route param
    const lesson = await GetLessonById(id); // Get lesson by ID using service function
    if (!lesson) {
      return c.json(
        {
          message: "Lesson not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved lesson",
        httpStatus: StatusCodes.OK,
        data: lesson,
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

// Route to update a Lesson by ID
lessonRoutes.put("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get lesson ID from route param
    const data = await c.req.json(); // Get updated lesson data from request body
    const updatedLesson = await UpdateLesson(id, data); // Update lesson using service function
    if (!updatedLesson) {
      return c.json(
        {
          message: "Lesson not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated lesson",
        httpStatus: StatusCodes.OK,
        data: updatedLesson,
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

// Route to delete a Lesson by ID
lessonRoutes.delete("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get lesson ID from route param
    const deletedLesson = await DeleteLesson(id); // Delete lesson using service function
    if (!deletedLesson) {
      return c.json(
        {
          message: "Lesson not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted lesson",
        httpStatus: StatusCodes.OK,
        data: deletedLesson,
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

export default lessonRoutes;
