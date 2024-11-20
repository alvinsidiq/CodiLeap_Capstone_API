import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import {
  AddQuizAnswer,
  GetAllQuizAnswer,
  GetQuizAnswerById,
  UpdateQuizAnswer,
  DeleteQuizAnswer,
} from "@/service/quiz_answer_choices_services";
import { AddQuizAnswerChoicesType } from "@/core/models/quiz_answer_choices_model";

// Post Quiz Answer Choice
const postQuizAnswerChoiceController = async (c: Context) => {
  try {
    const data: AddQuizAnswerChoicesType = await c.req.json();
    const response = await AddQuizAnswer(data);
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
};

// Get All Quiz Answer Choices
const getAllQuizAnswerChoicesController = async (c: Context) => {
  try {
    const choices = await GetAllQuizAnswer();
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
};

// Get Quiz Answer Choice by ID
const getQuizAnswerChoiceByIdController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const choice = await GetQuizAnswerById(id);
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
};

// Update Quiz Answer Choice
const updateQuizAnswerChoiceController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const data = await c.req.json();
    const choice = await UpdateQuizAnswer(id, data);
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
        message: "Successfully updated quiz answer choice",
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
};

// Delete Quiz Answer Choice
const deleteQuizAnswerChoiceController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const choice = await DeleteQuizAnswer(id);
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
        message: "Successfully deleted quiz answer choice",
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
};

export {
  postQuizAnswerChoiceController,
  getAllQuizAnswerChoicesController,
  getQuizAnswerChoiceByIdController,
  updateQuizAnswerChoiceController,
  deleteQuizAnswerChoiceController,
};
