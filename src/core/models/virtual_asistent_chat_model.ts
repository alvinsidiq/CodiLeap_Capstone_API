
import {z} from "zod";

export const VirtualAsistentChat = z.object 
({
    user_id : z.number().min(1),
    question : z.string().min(3),
    answer : z.string().min(3),
    
});

export type AddVirtualAsistentType = z.infer<typeof VirtualAsistentChat>;

export type UpdateVirtualAsistentType = Partial<AddVirtualAsistentType>;