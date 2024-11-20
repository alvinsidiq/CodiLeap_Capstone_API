
import {z} from "zod";

export const Modules = z.object 
({
    name : z.string().min(3),
    total_lesson : z.number().optional(),
      
});

export type AddModulesType = z.infer<typeof Modules>;

export type UpdateModulesType = Partial<AddModulesType>;