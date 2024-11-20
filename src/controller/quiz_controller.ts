import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
  AddQuiz,
  GetAllQuiz,
  GetQuizById,
  UpdateQuiz,
  DeleteVirtualAsistent,
} from "@/service/quiz_service";
import { AddQuizType } from "@/core/models/quiz.model";

// Post Quiz
const postQuizController = async (c: Context) => {
  try {
    const data: AddQuizType = await c.req.json();
    const response = await AddQuiz(data);
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
};

// Get All Quizzes
const getAllQuizController = async (c: Context) => {
  try {
    const quizzes = await GetAllQuiz();
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
};

// Get Quiz by ID
const getQuizByIdController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const quiz = await GetQuizById(id);
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
};

// Update Quiz
const updateQuizController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const data: AddQuizType = await c.req.json();
    const quiz = await UpdateQuiz(id, data);
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
        message: "Successfully updated quiz entry",
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
};

// Delete Quiz
const deleteQuizController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const quiz = await DeleteVirtualAsistent(id);
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
        message: "Successfully deleted quiz entry",
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
};

export {
  postQuizController,
  getAllQuizController,
  getQuizByIdController,
  updateQuizController,
  deleteQuizController,
};
