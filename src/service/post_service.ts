import db from '../core/db/index_db';

export const getPostService = async () => {
  return await db.query.posts.findMany();
};
