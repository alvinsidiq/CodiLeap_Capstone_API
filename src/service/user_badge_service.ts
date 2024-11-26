// import db from "@/core/db/index_db";
// import { UserBadgeModel } from "@/core/models/user_badge_model";
// import { BadgeModel } from "@/core/models/badge_model";
// import { eq, and } from "drizzle-orm";


// export async function getUserBadges(userId: number) {
//   // Fetch badges yang sudah diraih
//   const earnedBadges = await db
//     .select({
//       id: UserBadgeModel.table.id,
//       title: BadgeModel.table.title,
//       description: BadgeModel.table.description,
//       imageUrl: BadgeModel.table.imageUrl,
//       earnedAt: UserBadgeModel.table.earnedAt,
//     })
//     .from(UserBadgeModel.table)
//     .innerJoin(BadgeModel.table, eq(UserBadgeModel.table.badgeId, BadgeModel.table.id))
//     .where(eq(UserBadgeModel.table.userId, userId));

//     const availableBadges = await db
//     .select({
//       id: BadgeModel.table.id,
//       title: BadgeModel.table.title,
//       description: BadgeModel.table.description,
//       requirements: BadgeModel.table.requirements,
//     })
//     .from(BadgeModel.table)
//     .where(and(
//       eq(BadgeModel.table.id, UserBadgeModel.table.badgeId, false),
//       eq(UserBadgeModel.table.userId, userId, false)
//     ));

//   return { earnedBadges, availableBadges };
// }


export const registerUserBadge = async (data: registerUserBadgeType) => {
  try {
    const response = await db
      .insert(UserBadge)
      .values({
        user_id: data.user_id,
      })
      .returning();
    return response;
  } catch (error: any) {
    throw new Error("Failed to add user badge" + error.mesasge);
  }
};

export const GetAllUserBadge = async () => {
  try {
    const response = await db.query.UserBadge.findMany();
    return response;
  } catch (error: any) {
    throw new Error("Failed to get all user badges " + error.message);
  }
};

export const GetUserBadgetById = async (id: number) => {
  try {
    const response = await db.query.UserBadge.findFirst({
      where: (user, { eq }) => eq(user.user_badge_id, id),
    });
    return response;
  } catch (error: any) {
    throw new Error("Failed to get user badge  by id " + error.message);
  }
};

export const updateBadge = async (id: number, data: UpdateUserBadgeType) => {
  try {
    const response = await db
      .update(UserBadge)
      .set({
        user_id: data.user_id,
      })
      .where(eq(UserBadge.user_badge_id, id));
    return response;
  } catch (error: any) {
    throw new Error("Failed to update user badge " + error.message);
  }
};

export const deleteBadge = async (id: number) => {
  try {
    const response = await db
      .delete(UserBadge)
      .where(eq(UserBadge.user_badge_id, id));
    return response;
  } catch (error: any) {
    throw new Error("Failed to delete user badge " + error.message);
  }
};
