import { z } from "zod";

export const UserModulProgres = z.object({
  user_id: z.number().min(1),
  module_id: z.number().min(1),
  current_lesson: z.number().min(1),
});

export type registerUserModulProgresType = z.infer<typeof UserModulProgres>;

export type UpdateUserModulProgresType = Partial<registerUserModulProgresType>;
