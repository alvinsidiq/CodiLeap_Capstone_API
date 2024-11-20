import db from '@/core/db/index_db';
import { AddQuizType,UpdateQuizType } from '@/core/models/quiz.model';
import { Quiz } from '@/core/db/schema/index_schema';
import {eq} from 'drizzle-orm';



export const AddQuiz = async (data : AddQuizType) => {
    try {
       const response = await db.insert(Quiz).values ({

       modul_id : data.modul_id,
       user_id : data.user_id,
       selected_answer_id :data.selected_answer_id,
       correct_answer_id : data.correct_answer_id,
       quiz_title : data.quiz_title,
           })
.returning();
return response;

    } catch (error: any) {
        throw new Error('Failed to add  Quiz' + error.mesasge);
    }
};

export const GetAllQuiz = async () => {
    try {
        const response = await db.query.Quiz.findMany();
        return response;
    } catch (error: any) {
        throw new Error('Failed to get all  Quiz  ' + error.message);
    }

};

export const GetQuizById = async (id : number) => {
    try {
        const response = await db.query.Quiz.findFirst({
            where: (user,{eq}) => eq(user.quiz_id,id),
        });
        return response;
    } catch (error : any ) {
        throw new Error('Failed to get  Quiz  by id ' + error.message);
        
    }
};

export const UpdateQuiz = async (id : number, data : UpdateQuizType ) => {
    try {
         const response = await db
        .update(Quiz)
        .set({
       modul_id : data.modul_id,
       user_id : data.user_id,
       selected_answer_id :data.selected_answer_id,
       correct_answer_id : data.correct_answer_id,
       quiz_title : data.quiz_title,
    
        })
        .where(eq(Quiz.quiz_id, id));
        return response;
    } catch (error:any) {
         throw new Error('Failed to update Quiz  ' + error.message);
    }
};


export const DeleteVirtualAsistent = async ( id : number) => {
    try {
        const response = await db.delete(Quiz).where(eq(Quiz.quiz_id, id));
        return response;
    } catch (error: any) {
        throw new Error('Failed to delete Quiz  ' + error.message);
    }
};

