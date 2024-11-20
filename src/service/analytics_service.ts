import db from '@/core/db/index_db';
import { AddAnalyticsType,UpdateAnalyticsType } from '@/core/models/analytics_model';
import { Analytics } from '@/core/db/schema/index_schema';
import {eq} from 'drizzle-orm';



export const AddAnalytics = async (data : AddAnalyticsType) => {
    try {
       const response = await db.insert(Analytics).values ({

       user_id : data.user_id,
       avg_daily_time_spending : data.avg_daily_time_spending,

       })
.returning();
return response;

    } catch (error: any) {
        throw new Error('Failed to add  analytics' + error.mesasge);
    }
};

export const GetAllAnalytics = async () => {
    try {
        const response = await db.query.Analytics.findMany();
        return response;
    } catch (error: any) {
        throw new Error('Failed to get all  Analytics  ' + error.message);
    }

};

export const GetAnalyticsById = async (id : number) => {
    try {
        const response = await db.query.Analytics.findFirst({
            where: (user,{eq}) => eq(user.analytics_id,id),
        });
        return response;
    } catch (error : any ) {
        throw new Error('Failed to get  analytics  by id ' + error.message);
        
    }
};

export const UpdateAnalytics = async (id : number, data : UpdateAnalyticsType ) => {
    try {
         const response = await db
        .update(Analytics)
        .set({
            user_id : data.user_id,
            avg_daily_time_spending : data.avg_daily_time_spending,
    
        })
        .where(eq(Analytics.analytics_id, id));
        return response;
    } catch (error:any) {
         throw new Error('Failed to update analytics  ' + error.message);
    }
};


export const DeleteAnalytics = async ( id : number) => {
    try {
        const response = await db.delete(Analytics).where(eq(Analytics.analytics_id, id));
        return response;
    } catch (error: any) {
        throw new Error('Failed to delete Analytics  ' + error.message);
    }
};

