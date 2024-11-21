import db from '@/core/db/index_db';
import { AddLessonType,UpdateAddLessonType} from '@/core/models/lesson_model';
import { Lesson } from '@/core/db/schema/index_schema';
import {eq} from 'drizzle-orm';



export const AddLesson = async (data : AddLessonType) => {
    try {
       const response = await db.insert(Lesson)
       .values ({
    module_id : data.module_id,
    name : data.name,
     })
.returning();
return response;

    } catch (error: any) {
        throw new Error('Failed to add  Lesson' + error.mesasge);
    }
};

export const GetAllLesson = async () => {
    try {
        const response = await db.query.Lesson.findMany();
        return response;
    } catch (error: any) {
        throw new Error('Failed to get all Lesson ' + error.message);
    }

};

export const GetLessonById = async (id : number) => {
    try {
        const response = await db.query.Lesson.findFirst({
            where: (user,{eq}) => eq(user.lesson_id,id),
        });
        return response;
    } catch (error : any ) {
        throw new Error('Failed to get  lesson   by id ' + error.message);
        
    }
};

export const UpdateLesson  = async (id : number, data : UpdateAddLessonType ) => {
    try {
         const response = await db
        .update(Lesson)
        .set({
            module_id : data.module_id,
            name : data.name,
    
        })
        .where(eq(Lesson.lesson_id, id));
        return response;
    } catch (error:any) {
         throw new Error('Failed to update screaning  ' + error.message);
    }
};


export const DeleteLesson = async ( id : number) => {
    try {
        const response = await db.delete(Lesson).where(eq(Lesson.lesson_id, id));
        return response;
    } catch (error: any) {
        throw new Error('Failed to delete lesson  ' + error.message);
    }
};

