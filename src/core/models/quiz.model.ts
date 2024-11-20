
import {z} from "zod";

export const Quiz = z.object 
({
    modul_id : z.number().min(1),
    user_id : z.number().min(1),
    selected_answer_id : z.number().min(1),
    correct_answer_id : z.number().min(1),
    quiz_title : z.string().min(1),
  
});

export type AddQuizType = z.infer<typeof Quiz>;

export type UpdateQuizType = Partial<AddQuizType>;