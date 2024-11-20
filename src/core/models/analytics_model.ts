
import {z} from "zod";

export const Analytics = z.object 
({
    user_id : z.number().min(1),
    avg_daily_time_spending : z.number().min(5),
  
});

export type AddAnalyticsType = z.infer<typeof Analytics>;

export type UpdateAnalyticsType = Partial<AddAnalyticsType>;