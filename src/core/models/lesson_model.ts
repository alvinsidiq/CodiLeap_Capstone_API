
import {z} from "zod";

export const Lesson = z.object 
({
    module_id : z.number().min(1),
    name : z.string().min(1),
    
   
});

export type AddLessonType = z.infer<typeof Lesson>;

export type UpdateAddLessonType = Partial<AddLessonType>;