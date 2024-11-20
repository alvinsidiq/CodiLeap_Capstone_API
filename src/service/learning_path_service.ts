import db from '@/core/db/index_db';
import { AddLearningPathType, UpdateLearningPathType } from '@/core/models/learning_path_model';
import { LearningPath } from '@/core/db/schema/index_schema';
import {eq} from 'drizzle-orm';



export const AddLearningPath = async (data : AddLearningPathType) => {
    try {
       const response = await db.insert(LearningPath)
       .values ({
    name : data.name,
    level : data.level,
     })
.returning();
return response;

    } catch (error: any) {
        throw new Error('Failed to add  Learning path ' + error.mesasge);
    }
};

export const GetAllLearningPath = async () => {
    try {
        const response = await db.query.LearningPath.findMany();
        return response;
    } catch (error: any) {
        throw new Error('Failed to get all learning path ' + error.message);
    }

};

export const GetLearningPathById = async (id : number) => {
    try {
        const response = await db.query.Lesson.findFirst({
            where: (user,{eq}) => eq(user.lesson_id,id),
        });
        return response;
    } catch (error : any ) {
        throw new Error('Failed to get  LearningPath   by id ' + error.message);
        
    }
};

export const UpdateLearningPath  = async (id : number, data : UpdateLearningPathType ) => {
    try {
         const response = await db
        .update(LearningPath)
        .set({
            name : data.name,
            level : data.level,
    
        })
        .where(eq(LearningPath.learning_path_id, id));
        return response;
    } catch (error:any) {
         throw new Error('Failed to update learning path  ' + error.message);
    }
};


export const DeleteLearningPath = async ( id : number) => {
    try {
        const response = await db.delete(LearningPath).where(eq(LearningPath.learning_path_id, id));
        return response;
    } catch (error: any) {
        throw new Error('Failed to delete learning path   ' + error.message);
    }
};

