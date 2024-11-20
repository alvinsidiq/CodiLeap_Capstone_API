import { z } from "zod";

export const UserBadge = z.object({
  user_id: z.number(),
});

export type registerUserBadgeType = z.infer<typeof UserBadge>;

export type UpdateUserBadgeType = Partial<registerUserBadgeType>;
