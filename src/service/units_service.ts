import db from '@/core/db/index_db';
import { AddUnitsType, UpdateUnitsType} from '@/core/models/units_model';
import { Units } from '@/core/db/schema/index_schema';
import {eq} from 'drizzle-orm';



export const AddUnits = async (data : AddUnitsType) => {
    try {
       const response = await db.insert(Units)
       .values ({

    lesson_id : data.lesson_id,
    order : data.order,
    content : data.content,
    
   
     })
.returning();
return response;

    } catch (error: any) {
        throw new Error('Failed to add  units  path ' + error.mesasge);
    }
};

export const GetAllUnits = async () => {
    try {
        const response = await db.query.LearningPath.findMany();
        return response;
    } catch (error: any) {
        throw new Error('Failed to get all units ' + error.message);
    }

};

export const GetUnitsById = async (id : number) => {
    try {
        const response = await db.query.Units.findFirst({
            where: (user,{eq}) => eq(user.unit_id,id),
        });
        return response;
    } catch (error : any ) {
        throw new Error('Failed to get Units   by id ' + error.message);
        
    }
};

export const UpdateUnits  = async (id : number, data : UpdateUnitsType ) => {
    try {
         const response = await db
        .update(Units)
        .set({

            lesson_id : data.lesson_id,
            order : data.order,
            content : data.content,
            
    
        })
        .where(eq(Units.unit_id, id));
        return response;
    } catch (error:any) {
         throw new Error('Failed to update unit  ' + error.message);
    }
};


export const DeleteLearningPath = async ( id : number) => {
    try {
        const response = await db.delete(Units).where(eq(Units.unit_id, id));
        return response;
    } catch (error: any) {
        throw new Error('Failed to delete units id   ' + error.message);
    }
};

