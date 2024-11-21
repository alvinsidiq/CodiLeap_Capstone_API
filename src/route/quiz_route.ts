import { Hono } from "hono";
import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { zValidator } from "@hono/zod-validator";
import { Quiz } from "@/core/models/quiz.model"; // Zod schema untuk validasi
import {
  AddQuiz,
  GetAllQuiz,
  GetQuizById,
  UpdateQuiz,
  DeleteVirtualAsistent,
} from "@/service/quiz_service"; // Import service functions
import { AddQuizType } from "@/core/models/quiz.model"; // Type for quiz data

// Define the Hono route handler for quiz
const quizRoutes = new Hono();

// Route to create a new Quiz entry
quizRoutes.post(
  "/",
  zValidator("json", Quiz), // Validate input data using Zod schema
  async (c: Context) => {
    try {
      const data: AddQuizType = await c.req.json(); // Get request body
      const response = await AddQuiz(data); // Add new quiz using service function
      return c.json(
        {
          message: "Successfully created quiz entry",
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

// Route to get all Quiz entries
quizRoutes.get("/", async (c: Context) => {
  try {
    const quizzes = await GetAllQuiz(); // Get all quizzes using service function
    return c.json(
      {
        message: "Successfully retrieved all quizzes",
        httpStatus: StatusCodes.OK,
        data: quizzes,
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

// Route to get a Quiz entry by ID
quizRoutes.get("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get quiz ID from URL parameter
    const quiz = await GetQuizById(id); // Get quiz by ID using service function
    if (!quiz) {
      return c.json(
        {
          message: "Quiz entry not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved quiz entry",
        httpStatus: StatusCodes.OK,
        data: quiz,
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

// Route to update a Quiz entry by ID
quizRoutes.put("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get quiz ID from URL parameter
    const data: AddQuizType = await c.req.json(); // Get updated quiz data from request body
    const updatedQuiz = await UpdateQuiz(id, data); // Update quiz using service function
    if (!updatedQuiz) {
      return c.json(
        {
          message: "Quiz entry not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated quiz entry",
        httpStatus: StatusCodes.OK,
        data: updatedQuiz,
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

// Route to delete a Quiz entry by ID
quizRoutes.delete("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get quiz ID from URL parameter
    const deletedQuiz = await DeleteVirtualAsistent(id); // Delete quiz by ID using service function
    if (!deletedQuiz) {
      return c.json(
        {
          message: "Quiz entry not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted quiz entry",
        httpStatus: StatusCodes.OK,
        data: deletedQuiz,
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

export default quizRoutes;
