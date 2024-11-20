
import {z} from "zod";

export const LearningPath = z.object 
({
    name : z.string().min(3),
    level : z.string().min(3),

    
   
});

export type AddLearningPathType = z.infer<typeof LearningPath>;

export type UpdateLearningPathType = Partial<AddLearningPathType>;