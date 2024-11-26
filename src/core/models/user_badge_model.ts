import { UserBadge, Badge, User } from "@/core/db/schema/index_schema";
import { relations } from "drizzle-orm";

// Relasi UserBadge
export const userBadgeRelations = relations(UserBadge, ({ one }) => ({
    badge: one(Badge, {
    fields: [UserBadge.badgeId],
    references: [Badge.badgeid],

  }),
  user: one(User, {
    fields: [UserBadge.userId],
    references: [User.id],
  }),
  
}));

export const UserBadgeModel = {
  table: UserBadge,
  relations: userBadgeRelations,
};



// export const UserBadge = z.object({
//   user_id: z.number(),
// });

// export type registerUserBadgeType = z.infer<typeof UserBadge>;

// export type UpdateUserBadgeType = Partial<registerUserBadgeType>;
