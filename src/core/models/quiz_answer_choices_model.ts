
import {z} from "zod";

export const QuizAnswerChoices = z.object 
({
    quiz_id : z.number().min(1),
    content : z.string().min(1),
    order : z.number().optional(),
   
});

export type AddQuizAnswerChoicesType = z.infer<typeof QuizAnswerChoices>;

export type UpdateQuizAnswerChoicesType = Partial<AddQuizAnswerChoicesType>;