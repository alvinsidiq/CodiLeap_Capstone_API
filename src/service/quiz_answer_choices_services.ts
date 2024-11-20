import db from '@/core/db/index_db';
import { AddQuizAnswerChoicesType,UpdateQuizAnswerChoicesType } from '@/core/models/quiz_answer_choices_model';
import { QuizAnswerChoices } from '@/core/db/schema/index_schema';
import {eq} from 'drizzle-orm';



export const AddQuizAnswer= async (data : AddQuizAnswerChoicesType) => {
    try {
       const response = await db.insert(QuizAnswerChoices)
       .values ({
     quiz_id : data.quiz_id,
     content : data.content,
     order : data.order,    
           })
.returning();
return response;

    } catch (error: any) {
        throw new Error('Failed to add  content ' + error.mesasge);
    }
};

export const GetAllQuizAnswer = async () => {
    try {
        const response = await db.query.Quiz.findMany();
        return response;
    } catch (error: any) {
        throw new Error('Failed to get all  Quiz Answer ' + error.message);
    }

};

export const GetQuizAnswerById = async (id : number) => {
    try {
        const response = await db.query.QuizAnswerChoices.findFirst({
            where: (user,{eq}) => eq(user.quiz_answer_choices_id,id),
        });
        return response;
    } catch (error : any ) {
        throw new Error('Failed to get  Quiz answer   by id ' + error.message);
        
    }
};

export const UpdateQuizAnswer  = async (id : number, data : UpdateQuizAnswerChoicesType ) => {
    try {
         const response = await db
        .update(QuizAnswerChoices)
        .set({
            quiz_id : data.quiz_id,
     content : data.content,
     order : data.order,
    
        })
        .where(eq(QuizAnswerChoices.quiz_answer_choices_id, id));
        return response;
    } catch (error:any) {
         throw new Error('Failed to update quiz answer  ' + error.message);
    }
};


export const DeleteQuizAnswer= async ( id : number) => {
    try {
        const response = await db.delete(QuizAnswerChoices).where(eq(QuizAnswerChoices.quiz_answer_choices_id, id));
        return response;
    } catch (error: any) {
        throw new Error('Failed to delete quiz answer  ' + error.message);
    }
};

