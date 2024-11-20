import { Hono } from "hono";
import {
  postQuizController,
  getAllQuizController,
  getQuizByIdController,
  updateQuizController,
  deleteQuizController,
} from "@/controller/quiz_controller";
import { zValidator } from "@hono/zod-validator";
import { Quiz } from "@/core/models/quiz.model";

const quiz = new Hono();

// Route for creating a new Quiz entry
quiz.post(
  "/",
  zValidator("json", Quiz), // Validate input data using Zod schema
  postQuizController
);

// Route for retrieving all Quiz entries
quiz.get("/", getAllQuizController);

// Route for retrieving a Quiz entry by ID
quiz.get("/:id", getQuizByIdController);

// Route for updating a Quiz entry by ID
quiz.put("/:id", updateQuizController);

// Route for deleting a Quiz entry by ID
quiz.delete("/:id", deleteQuizController);

export default quiz;
