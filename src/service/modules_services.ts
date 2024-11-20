import db from '@/core/db/index_db';
import { AddModulesType,UpdateModulesType } from '@/core/models/modules_model';
import { Modules } from '@/core/db/schema/index_schema';
import {eq} from 'drizzle-orm';




export const AddModules = async (data : AddModulesType) => {
    try {
       const response = await db.insert(Modules)
       .values ({
      name : data.name,
      total_lesson : data.total_lesson,
           })
.returning();
return response;

    } catch (error: any) {
        throw new Error('Failed to add  total lesson ' + error.mesasge);
    }
};

export const GetAllModules = async () => {
    try {
        const response = await db.query.Modules.findMany();
        return response;
    } catch (error: any) {
        throw new Error('Failed to get all  Modules  ' + error.message);
    }

};

export const GetModulesById = async (id : number) => {
    try {
        const response = await db.query.Modules.findFirst({
            where: (user,{eq}) => eq(user.module_id,id),
        });
        return response;
    } catch (error : any ) {
        throw new Error('Failed to get  Modules  by id ' + error.message);
        
    }
};

export const UpdateModules  = async (id : number, data : UpdateModulesType ) => {
    try {
         const response = await db
        .update(Modules)
        .set({
            name : data.name,
            total_lesson : data.total_lesson,
    
        })
        .where(eq(Modules.module_id, id));
        return response;
    } catch (error:any) {
         throw new Error('Failed to update modules_model  ' + error.message);
    }
};


export const DeleteModules = async ( id : number) => {
    try {
        const response = await db.delete(Modules).where(eq(Modules.module_id, id));
        return response;
    } catch (error: any) {
        throw new Error('Failed to delete modules  ' + error.message);
    }
};

