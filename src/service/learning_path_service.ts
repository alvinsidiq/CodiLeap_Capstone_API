import  db  from "@/core/db/index_db" ;
import { LearningPath } from "@/core/db/schema/index_schema"; 
import { LearningPathResponseType } from "@/core/models/learning_path_model";
import { eq } from "drizzle-orm"; 
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";

import { 
  ScreeningRequest, 
  ScreeningResponse, 
  RecommendedPath,
  ScreeningResults,
} from "@/core/models/learning_path_model";
//import { AddLearningPathType } from "@/core/models/learning_path_model"; 
// Menambahkan Learning Path baru

// Mengambil semua Learning Path
export const GetAllLearningPath = async (): Promise<{ data: LearningPathResponseType[] }> => {
  const data = await db
    .select({
      learningPathId: LearningPath.learningPathId,
      name: LearningPath.name,
      description: LearningPath.description,
      level: LearningPath.level,
      totalModules: LearningPath.totalModules,
      estimatedDuration: LearningPath.estimatedDuration,
      createdAt: LearningPath.createdAt,
      updatedAt: LearningPath.updatedAt,
    })
    .from(LearningPath);

  if (!data || data.length === 0) {
    throw new HTTPException(StatusCodes.NOT_FOUND, {
      message: "Learning Path Not Found",
      status: "error",
    });
  }

  return { data };
};


export const GetLearningPathById = async (id : string | number):Promise<{path : LearningPathResponseType}> => {
    const numericId = Number(id);
    if (isNaN(numericId)|| numericId <= 0 || !Number.isInteger(numericId)) {
        throw new HTTPException(StatusCodes.BAD_REQUEST, {
        status: "Bad Request",
        error: "Invalid ID",
        errors: null
        });
    }

 // data di temukan
 const path = await db
 .select({
   id: LearningPath.learningPathId,
   description: LearningPath.description,
      estimatedDuration: LearningPath.estimatedDuration,
   createdAt: LearningPath.createdAt,
   updatedAt: LearningPath.updatedAt,
 })
 .from(LearningPath)
 .where(eq(LearningPath.learningPathId, numericId))
 .limit(1);

  // Check if path exists
  if (!path || path.length === 0) {
    throw new HTTPException(StatusCodes.NOT_FOUND, {
      status: "Not Found",
      error: "Learning path not found",
      errors: null
    });
    
  }
   // Return the found path
   return { path };

};



export const createScreeningService = (db: any) => {
  const evaluateScreening = async (
    answers: ScreeningRequest["answers"]
  ): Promise<ScreeningResults> => {
    // Get all questions and correct answers from database
    const questions = await db.query.questions.findMany({
      with: {
        answers: true,
      },
    });

    // Calculate score based on correct answers
    let correctAnswers = 0;
    const strengths: Set<string> = new Set();

    for (const answer of answers) {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) continue;

      const selectedAnswer = question.answers.find(a => a.id === answer.selectedAnswerId);
      if (!selectedAnswer) continue;

      // Add to strengths if correct answer
      if (selectedAnswer.isCorrect) {
        correctAnswers++;
        if (question.category) {
          strengths.add(question.category);
        }
      }
    }

    const score = Math.round((correctAnswers / questions.length) * 100);

    return {
      score,
      strengths: Array.from(strengths),
    };
  };

  const determineRecommendedPath = async (
    results: ScreeningResults
  ): Promise<RecommendedPath> => {
    // Logic to determine the best learning path based on score and strengths
    let level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    
    if (results.score < 40) {
      level = "BEGINNER";
    } else if (results.score < 75) {
      level = "INTERMEDIATE";
    } else {
      level = "ADVANCED";
    }

    // Get appropriate learning path from database
    const path = await db.query.learningPaths.findFirst({
      where: eq(db.learningPaths.level, level),
    });

    if (!path) {
      throw new Error("No suitable learning path found");
    }

    return {
      pathId: path.id,
      pathName: path.name,
      level: path.level,
      reason: `Based on your score of ${results.score}% and strengths in ${results.strengths.join(", ")}`,
    };
  };

  const saveScreeningResults = async (data: {
    userId: number;
    pathId: number;
    score: number;
    strengths: string[];
    answers: ScreeningRequest["answers"];
  }) => {
    return await db.insert(db.screeningResults).values(data);
  };

  const processScreening = async (
    screeningRequest: ScreeningRequest
  ): Promise<ScreeningResponse> => {
    try {
      // Calculate score and determine strengths
      const results = await evaluateScreening(screeningRequest.answers);
      
      // Get recommended path based on results
      const recommendedPath = await determineRecommendedPath(results);

      // Save screening results
      await saveScreeningResults({
        userId: 1, // Should come from authenticated user
        pathId: recommendedPath.pathId,
        score: results.score,
        strengths: results.strengths,
        answers: screeningRequest.answers,
      });

      return {
        message: "Screening completed successfully",
        status: "success",
        data: {
          recommendedPath,
          screeningResults: results,
        },
      };
    } catch (error: any) {
      throw new Error(`Screening process failed: ${error.message}`);
    }
  };

  return {
    processScreening,
    evaluateScreening,
    determineRecommendedPath,
    saveScreeningResults,
  };
};


// Mengambil Learning Path berdasarkan ID
// export const GetLearningPathById = async (id: number) => {
//   try {
//     const learningPath = await db
//       .select()
//       .from(LearningPath)
//       .where(eq(LearningPath.learning_path_id, id))
//       .limit(1);

//     return learningPath.length > 0 ? learningPath[0] : null;
//   } catch (error : any) {
//     throw new Error("Failed to retrieve learning path: " + error.message);
//   }
// };

// Memperbarui Learning Path
// export const UpdateLearningPath = async (
//   id: number,
//   data: {
//     name?: string;
//     description?: string;
//     level?: string;
//     totalModules?: number;
//     estimatedDuration?: string;
//   }
// ) => {
//   try {
//     const existingPath = await GetLearningPathById(id);
//     if (!existingPath) {
//       throw new Error("Learning path not found");
//     }

//     const updatedLearningPath = await db
//       .update(LearningPath)
//       .set({
//         name: data.name || existingPath.name,
//         description: data.description || existingPath.description,
//         level: data.level || existingPath.level,
//         totalModules: data.totalModules || existingPath.totalModules,
//         estimatedDuration: data.estimatedDuration || existingPath.estimatedDuration,
//       })
//       .where(eq(LearningPath.learning_path_id, id));

//     return updatedLearningPath;
//   } catch (error:any) {
//     throw new Error("Failed to update learning path: " + error.message);
//   }
// };

// Menghapus Learning Path
// export const DeleteLearningPath = async (id: number) => {
//     try {
//         const response = await db.delete(LearningPath).where(eq(LearningPath.learning_path_id, id));
//         return response;
//     } catch (error: any) {
//         throw new Error('Failed to delete badge ' + error.message);
//     }
// };
