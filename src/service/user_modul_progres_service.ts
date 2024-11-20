import db from "@/core/db/index_db";
import {
  registerUserModulProgresType,
  UpdateUserModulProgresType,
} from "@/core/models/user_modul_progres_model";

import { UserModulProgres } from "@/core/db/schema/index_schema";

import { eq } from "drizzle-orm";

export const registerUserModulProgres = async (
  data: registerUserModulProgresType
) => {
  try {
    const response = await db
      .insert(UserModulProgres)
      .values({
        user_id: data.user_id,
        module_id: data.module_id,
        current_lesson: data.current_lesson,
      })
      .returning();
    return response;
  } catch (error: any) {
    throw new Error("Failed to add user modul progres user " + error.mesasge);
  }
};

export const GetAllUserModulProgres = async () => {
  try {
    const response = await db.query.UserModulProgres.findMany();
    return response;
  } catch (error: any) {
    throw new Error("Failed to get all user modul progres " + error.message);
  }
};

export const GetUserModulProgresById = async (id: number) => {
  try {
    const response = await db.query.UserModulProgres.findFirst({
      where: (user, { eq }) => eq(user.user_modul_progres_id, id),
    });
    return response;
  } catch (error: any) {
    throw new Error("Failed to get user modul progres  by id " + error.message);
  }
};

export const UpdateUserModulProgres = async (
  id: number,
  data: UpdateUserModulProgresType
) => {
  try {
    const response = await db
      .update(UserModulProgres)
      .set({
        user_id: data.user_id,
        module_id: data.module_id,
        current_lesson: data.current_lesson,
      })
      .where(eq(UserModulProgres.user_modul_progres_id, id));
    return response;
  } catch (error: any) {
    throw new Error("Failed to update user modul progres " + error.message);
  }
};

export const deleteUserModulProgres = async (id: number) => {
  try {
    const response = await db
      .delete(UserModulProgres)
      .where(eq(UserModulProgres.user_modul_progres_id, id));
    return response;
  } catch (error: any) {
    throw new Error("Failed to delete user modul progres " + error.message);
  }
};
