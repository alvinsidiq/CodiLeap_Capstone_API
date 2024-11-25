import { z } from "zod";

export const Modules = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  total_lesson: z.number().optional(),
  completed_lessons: z.number().optional(),
  learning_path_id: z.number()
});

export type AddModulesType = z.infer<typeof Modules>;
export type UpdateModulesType = Partial<AddModulesType>;