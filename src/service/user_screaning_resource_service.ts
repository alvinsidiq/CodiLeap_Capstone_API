import db from "@/core/db/index_db";
import {
  registerUserScreaningResourceType,
  UpdateUserScreaningResourceType,
} from "@/core/models/user_screaning_resource";
import { UserScreaningResource } from "@/core/db/schema/index_schema";
import { eq } from "drizzle-orm";

export const registerUserScreaning = async (
  data: registerUserScreaningResourceType
) => {
  try {
    const response = await db
      .insert(UserScreaningResource)
      .values({
        user_id: data.user_id,
        quiz_id: data.quiz_id,
        learning_path_id: data.learning_path_id,
      })
      .returning();
    return response;
  } catch (error: any) {
    throw new Error("Failed to add  Quiz" + error.mesasge);
  }
};

export const GetAllUserScreaning = async () => {
  try {
    const response = await db.query.Quiz.findMany();
    return response;
  } catch (error: any) {
    throw new Error("Failed to get all  screaning  " + error.message);
  }
};

export const GetUserScreaningById = async (id: number) => {
  try {
    const response = await db.query.UserScreaningResource.findFirst({
      where: (user, { eq }) => eq(user.user_screaning_resource_id, id),
    });
    return response;
  } catch (error: any) {
    throw new Error("Failed to get  user screaning  by id " + error.message);
  }
};

export const UpdateUserScreaning = async (
  id: number,
  data: UpdateUserScreaningResourceType
) => {
  try {
    const response = await db
      .update(UserScreaningResource)
      .set({
        user_id: data.user_id,
        quiz_id: data.quiz_id,
        learning_path_id: data.learning_path_id,
      })
      .where(eq(UserScreaningResource.user_screaning_resource_id, id));
    return response;
  } catch (error: any) {
    throw new Error("Failed to update screaning  " + error.message);
  }
};

export const DeleteUserScreaning = async (id: number) => {
  try {
    const response = await db
      .delete(UserScreaningResource)
      .where(eq(UserScreaningResource.user_screaning_resource_id, id));
    return response;
  } catch (error: any) {
    throw new Error("Failed to delete user screaning  " + error.message);
  }
};
