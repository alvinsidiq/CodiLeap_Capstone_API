import { z } from "zod";

// Define the schema for LearningPath
export const LearningPath = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100, { message: "Name must be at most 100 characters long" }),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"], {
    message: "Level must be one of BEGINNER, INTERMEDIATE, or ADVANCED",
  }),
  description: z
    .string()
    .max(255, { message: "Description must be at most 255 characters long" })
    .optional(),
  totalModules: z
    .number()
    .int()
    .min(1, { message: "Total modules must be at least 1" }),
  estimatedDuration: z
    .string()
    .min(1, { message: "Estimated duration is required" }),
});

export type LearningPathResponseType = {
  learningPathId: number;
  name: string;
  description : Text;
  level : Text ;
  totalModules : number;
  estimatedDuration: Text;
  createdAt: Date;
  updatedAt: Date;
};

// Define types for adding and updating LearningPath
export type AddLearningPathType = z.infer<typeof LearningPath>;

// Updating allows partial fields (only updating the fields needed)
export type UpdateLearningPathType = Partial<AddLearningPathType>;




// Answer Schema
export const AnswerSchema = z.object({
  questionId: z.number().int().positive("Question ID must be a positive integer"),
  selectedAnswerId: z.number().int().positive("Selected answer ID must be a positive integer"),
});

   // Screening Request Schema
export const ScreeningRequestSchema = z.object({
  answers: z.array(AnswerSchema)
    .nonempty("At least one answer is required")
    .max(50, "Maximum 50 answers allowed"),
});

// Recommended Path Schema
export const RecommendedPathSchema = z.object({
  pathId: z.number().int().positive(),
  pathName: z.string().min(1, "Path name is required"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"], {
    message: "Level must be one of: BEGINNER, INTERMEDIATE, or ADVANCED",
  }),
  reason: z.string().min(1, "Reason is required"),
});

// Screening Results Schema
export const ScreeningResultsSchema = z.object({
  score: z.number().int().min(0).max(100),
  strengths: z.array(z.string()).nonempty("At least one strength is required"),
});

// Screening Response Schema
export const ScreeningResponseSchema = z.object({
  message: z.string(),
  status: z.string(),
  data: z.object({
    recommendedPath: RecommendedPathSchema,
    screeningResults: ScreeningResultsSchema,
  }),
});

// Error Response Schema
export const ErrorResponseSchema = z.object({
  status: z.string(),
  error: z.string(),
  errors: z.record(z.string()),
});

// Export types from schemas
export type Answer = z.infer<typeof AnswerSchema>;
export type ScreeningRequest = z.infer<typeof ScreeningRequestSchema>;
export type RecommendedPath = z.infer<typeof RecommendedPathSchema>;
export type ScreeningResults = z.infer<typeof ScreeningResultsSchema>;
export type ScreeningResponse = z.infer<typeof ScreeningResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;