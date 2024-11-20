import db from '@/core/db/index_db';
import {AddNewBadgeType,UpdateBadgeType} from '@/core/models/badge_model';

import { Badge } from '@/core/db/schema/index_schema';

import {eq} from 'drizzle-orm';



export const AddBadge = async (data : AddNewBadgeType) => {
    try {
       const response = await db.insert(Badge)
       .values ({
        title: data.title,
        description: data.description,
        image: data.image,
       })
.returning();
return response;

    } catch (error: any) {
        throw new Error('Failed to add badge' + error.mesasge);
    }
};

export const GetAllBadge = async () => {
    try {
        const response = await db.query.Badge.findMany();
        return response;
    } catch (error: any) {
        throw new Error('Failed to get all badges ' + error.message);
    }

};

export const GetBadgetById = async (id : number) => {
    try {
        const response = await db.query.Badge.findFirst({
            where: (user,{eq}) => eq(user.badge_id,id),
        });
        return response;
    } catch (error : any ) {
        throw new Error('Failed to get user by id ' + error.message);
        
    }
};

export const UpdateBadge = async (id : number, data : UpdateBadgeType ) => {
    try {
         const response = await db
        .update(Badge)
        .set({
            title: data.title,
            description: data.description,
            image: data.image,
        })
        .where(eq(Badge.badge_id, id));
        return response;
    } catch (error:any) {
         throw new Error('Failed to update badge ' + error.message);
    }
};


export const DeleteBadge = async ( id : number) => {
    try {
        const response = await db.delete(Badge).where(eq(Badge.badge_id, id));
        return response;
    } catch (error: any) {
        throw new Error('Failed to delete badge ' + error.message);
    }
};

