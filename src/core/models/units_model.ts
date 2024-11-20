
import {z} from "zod";

export const Units = z.object 
({
    lesson_id : z.number().min(1),
    order : z.number().min(1),
    content : z.string().min(5),
     
});

export type AddUnitsType = z.infer<typeof Units>;

export type UpdateUnitsType = Partial<AddUnitsType>;