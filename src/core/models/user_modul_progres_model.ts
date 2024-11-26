import { User, UserBadge } from "@/core/db/schema/index_schema";
import { relations } from "drizzle-orm";

// Relasi User
export const userRelations = relations(User, ({ many }) => ({
  earnedBadges: many(UserBadge, {
    fields: [User.id],
    references: [UserBadge.userId],
  }),
}));

export const UserModel = {
  table: User,
  relations: userRelations,
};
