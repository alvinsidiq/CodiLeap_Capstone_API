import db from '@/core/db/index_db';
import { AddVirtualAsistentType,UpdateVirtualAsistentType } from '@/core/models/virtual_asistent_chat_model';
import { VirtualAsistentChat } from '@/core/db/schema/index_schema';

import {eq} from 'drizzle-orm';



export const AddVirtualAsistent = async (data : AddVirtualAsistentType) => {
    try {
       const response = await db.insert(VirtualAsistentChat).values ({

       user_id : data.user_id,
       question : data.question,
       answer : data.answer,

       })
.returning();
return response;

    } catch (error: any) {
        throw new Error('Failed to add virtual asistent' + error.mesasge);
    }
};

export const GetAllVirtualAsistent = async () => {
    try {
        const response = await db.query.VirtualAsistentChat.findMany();
        return response;
    } catch (error: any) {
        throw new Error('Failed to get all virtual asistent  ' + error.message);
    }

};

export const GetVirtualAsistentById = async (id : number) => {
    try {
        const response = await db.query.VirtualAsistentChat.findFirst({
            where: (user,{eq}) => eq(user.virtual_asistent_chat_id,id),
        });
        return response;
    } catch (error : any ) {
        throw new Error('Failed to get virtual asistent  by id ' + error.message);
        
    }
};

export const UpdateVirtualAsistent = async (id : number, data : UpdateVirtualAsistentType ) => {
    try {
         const response = await db
        .update(VirtualAsistentChat)
        .set({
            user_id : data.user_id,
            question : data.question,
            answer : data.answer,
    
        })
        .where(eq(VirtualAsistentChat.virtual_asistent_chat_id, id));
        return response;
    } catch (error:any) {
         throw new Error('Failed to update virtual asistent ' + error.message);
    }
};


export const DeleteVirtualAsistent = async ( id : number) => {
    try {
        const response = await db.delete(VirtualAsistentChat).where(eq(VirtualAsistentChat.virtual_asistent_chat_id, id));
        return response;
    } catch (error: any) {
        throw new Error('Failed to delete Virtual asistent ' + error.message);
    }
};

