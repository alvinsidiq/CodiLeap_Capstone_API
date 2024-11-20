import { Hono } from "hono";
import {
  postLearningPathController,
  getAllLearningPathsController,
  getLearningPathByIdController,
  updateLearningPathController,
  deleteLearningPathController,
} from "@/controller/learning_path_controller"; // Mengimpor controller
import { zValidator } from "@hono/zod-validator";
import { LearningPath } from "@/core/models/learning_path_model"; // Mengimpor skema validasi Zod

// Definisikan handler route Hono
const learningPathRoutes = new Hono();

// Route untuk menambahkan Learning Path
learningPathRoutes.post(
  "/",
  zValidator("json", LearningPath), // Validasi input menggunakan skema Zod
  postLearningPathController
);

// Route untuk mengambil semua Learning Path
learningPathRoutes.get("/", getAllLearningPathsController);

// Route untuk mengambil Learning Path berdasarkan ID
learningPathRoutes.get("/:id", getLearningPathByIdController);

// Route untuk memperbarui Learning Path berdasarkan ID
learningPathRoutes.put("/:id", updateLearningPathController);

// Route untuk menghapus Learning Path berdasarkan ID
learningPathRoutes.delete("/:id", deleteLearningPathController);

export default learningPathRoutes;
