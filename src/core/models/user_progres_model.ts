import { z } from "zod";

export const UserProgres = z.object({
  user_id: z.number().min(1),
  lesson_id: z.number().min(1),
});

export type registerUserProgresType = z.infer<typeof UserProgres>;

export type updateUserProgresType = Partial<registerUserProgresType>;
