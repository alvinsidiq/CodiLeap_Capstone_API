// import db from "@/core/db/index_db";
/*Folder yang berisi service, yaitu modul yang menyediakan logika bisnis dan operasi data. */
import db from "@/core/db/index_db";

export const getPostService = async () => {
  return await db.query.posts.findMany();
};

