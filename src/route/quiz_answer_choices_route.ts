import { Hono } from "hono";
import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { zValidator } from "@hono/zod-validator";
import { QuizAnswerChoices } from "@/core/models/quiz_answer_choices_model"; // Zod schema untuk validasi
import {
  AddQuizAnswer,
  GetAllQuizAnswer,
  GetQuizAnswerById,
  UpdateQuizAnswer,
  DeleteQuizAnswer,
} from "@/service/quiz_answer_choices_services"; // Import service functions

// Define the Hono route handler for quiz answer choices
const quizAnswerChoiceRoutes = new Hono();

// Route to create a new Quiz Answer Choice
quizAnswerChoiceRoutes.post(
  "/",
  zValidator("json", QuizAnswerChoices), // Validate input data using Zod schema
  async (c: Context) => {
    try {
      const data = await c.req.json(); // Get request body
      const response = await AddQuizAnswer(data); // Add new quiz answer choice using service function
      return c.json(
        {
          message: "Successfully added quiz answer choice",
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

// Route to get all Quiz Answer Choices
quizAnswerChoiceRoutes.get("/", async (c: Context) => {
  try {
    const choices = await GetAllQuizAnswer(); // Get all quiz answer choices using service function
    return c.json(
      {
        message: "Successfully retrieved all quiz answer choices",
        httpStatus: StatusCodes.OK,
        data: choices,
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

// Route to get a Quiz Answer Choice by ID
quizAnswerChoiceRoutes.get("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get quiz answer choice ID from URL parameter
    const choice = await GetQuizAnswerById(id); // Get quiz answer choice by ID using service function
    if (!choice) {
      return c.json(
        {
          message: "Quiz answer choice not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully retrieved quiz answer choice",
        httpStatus: StatusCodes.OK,
        data: choice,
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

// Route to update a Quiz Answer Choice by ID
quizAnswerChoiceRoutes.put("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get quiz answer choice ID from URL parameter
    const data = await c.req.json(); // Get updated quiz answer choice data from request body
    const updatedChoice = await UpdateQuizAnswer(id, data); // Update quiz answer choice using service function
    if (!updatedChoice) {
      return c.json(
        {
          message: "Quiz answer choice not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully updated quiz answer choice",
        httpStatus: StatusCodes.OK,
        data: updatedChoice,
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

// Route to delete a Quiz Answer Choice by ID
quizAnswerChoiceRoutes.delete("/:id", async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id")); // Get quiz answer choice ID from URL parameter
    const deletedChoice = await DeleteQuizAnswer(id); // Delete quiz answer choice using service function
    if (!deletedChoice) {
      return c.json(
        {
          message: "Quiz answer choice not found",
          httpStatus: StatusCodes.NOT_FOUND,
          data: null,
        },
        StatusCodes.NOT_FOUND
      );
    }
    return c.json(
      {
        message: "Successfully deleted quiz answer choice",
        httpStatus: StatusCodes.OK,
        data: deletedChoice,
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

export default quizAnswerChoiceRoutes;
