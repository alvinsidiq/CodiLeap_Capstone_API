
import {z} from "zod";

export const Badge = z.object 
({
    title : z.string().min(1),
    description : z.string().optional(),
    image : z.string().min(1),
});

export type AddNewBadgeType = z.infer<typeof Badge>;

export type UpdateBadgeType = Partial<AddNewBadgeType>;