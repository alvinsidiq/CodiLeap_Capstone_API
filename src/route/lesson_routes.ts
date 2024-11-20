import { Hono } from "hono";
import {
  postLessonController,
  getAllLessonsController,
  getLessonByIdController,
  updateLessonController,
  deleteLessonController,
} from "@/controller/lesson_controller";
import { zValidator } from "@hono/zod-validator";
import { Lesson } from "@/core/models/lesson_model"; // Importing the Zod validation schema

// Define the Hono route handler
const lessonRoutes = new Hono();

// Route to create a new Lesson
lessonRoutes.post(
  "/",
  zValidator("json", Lesson), // Validate input data using Zod schema
  postLessonController
);

// Route to get all Lessons
lessonRoutes.get("/", getAllLessonsController);

// Route to get a Lesson by ID
lessonRoutes.get("/:id", getLessonByIdController);

// Route to update a Lesson by ID
lessonRoutes.put("/:id", updateLessonController);

// Route to delete a Lesson by ID
lessonRoutes.delete("/:id", deleteLessonController);

export default lessonRoutes;
