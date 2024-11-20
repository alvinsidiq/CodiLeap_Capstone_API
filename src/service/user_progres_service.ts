import db from "@/core/db/index_db";
import {
  registerUserProgresType,
  updateUserProgresType,
} from "@/core/models/user_progres_model";
import { UserProgres } from "@/core/db/schema/index_schema";

import { eq } from "drizzle-orm";

export const registerUserProgres = async (data: registerUserProgresType) => {
  try {
    const response = await db
      .insert(UserProgres)
      .values({
        user_id: data.user_id,
        lesson_id: data.lesson_id,
      })
      .returning();
    return response;
  } catch (error: any) {
    throw new Error("Failed to add user  progres  " + error.mesasge);
  }
};

export const GetAllUserProgres = async () => {
  try {
    const response = await db.query.UserProgres.findMany();
    return response;
  } catch (error: any) {
    throw new Error("Failed to get all user  progres " + error.message);
  }
};

export const GetUserProgresById = async (id: number) => {
  try {
    const response = await db.query.UserProgres.findFirst({
      where: (user, { eq }) => eq(user.user_progres_id, id),
    });
    return response;
  } catch (error: any) {
    throw new Error("Failed to get user  progres  by id " + error.message);
  }
};

export const UpdateUserProgres = async (
  id: number,
  data: updateUserProgresType
) => {
  try {
    const response = await db
      .update(UserProgres)
      .set({
        user_id: data.user_id,
        lesson_id: data.lesson_id,
      })
      .where(eq(UserProgres.user_progres_id, id));
    return response;
  } catch (error: any) {
    throw new Error("Failed to update user  progres " + error.message);
  }
};

export const deleteUserProgres = async (id: number) => {
  try {
    const response = await db
      .delete(UserProgres)
      .where(eq(UserProgres.user_progres_id, id));
    return response;
  } catch (error: any) {
    throw new Error("Failed to delete user progres " + error.message);
  }
};
