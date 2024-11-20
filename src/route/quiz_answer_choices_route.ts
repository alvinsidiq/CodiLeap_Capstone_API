import { Hono } from "hono";
import {
  postQuizAnswerChoiceController,
  getAllQuizAnswerChoicesController,
  getQuizAnswerChoiceByIdController,
  updateQuizAnswerChoiceController,
  deleteQuizAnswerChoiceController,
} from "@/controller/quiz_answer_choices_controller";
import { zValidator } from "@hono/zod-validator";
import { QuizAnswerChoices } from "@/core/models/quiz_answer_choices_model";

// Define the Hono route handler
const quizAnswerChoiceRoutes = new Hono();

// Route to create a new Quiz Answer Choice
quizAnswerChoiceRoutes.post(
  "/",
  zValidator("json", QuizAnswerChoices), // Validate input data using Zod schema
  postQuizAnswerChoiceController
);

// Route to get all Quiz Answer Choices
quizAnswerChoiceRoutes.get("/", getAllQuizAnswerChoicesController);

// Route to get a Quiz Answer Choice by ID
quizAnswerChoiceRoutes.get("/:id", getQuizAnswerChoiceByIdController);

// Route to update a Quiz Answer Choice by ID
quizAnswerChoiceRoutes.put("/:id", updateQuizAnswerChoiceController);

// Route to delete a Quiz Answer Choice by ID
quizAnswerChoiceRoutes.delete("/:id", deleteQuizAnswerChoiceController);

export default quizAnswerChoiceRoutes;
