
import db from "@/core/db/index_db";
import { UserBadgeModel } from "@/core/models/user_badge_model";
import { BadgeModel } from "@/core/models/badge_model";
import { eq, and } from "drizzle-orm";


export async function getUserBadges(userId: number) {
  // Fetch badges yang sudah diraih
  const earnedBadges = await db
    .select({
      id: UserBadgeModel.table.id,
      title: BadgeModel.table.title,
      description: BadgeModel.table.description,
      imageUrl: BadgeModel.table.imageUrl,
      earnedAt: UserBadgeModel.table.earnedAt,
    })
    .from(UserBadgeModel.table)
    .innerJoin(BadgeModel.table, eq(UserBadgeModel.table.badgeId, BadgeModel.table.id))
    .where(eq(UserBadgeModel.table.userId, userId));

    const availableBadges = await db
    .select({
      id: BadgeModel.table.id,
      title: BadgeModel.table.title,
      description: BadgeModel.table.description,
      requirements: BadgeModel.table.requirements,
    })
    .from(BadgeModel.table)
    .where(and(
      eq(BadgeModel.table.id, UserBadgeModel.table.badgeId, false),
      eq(UserBadgeModel.table.userId, userId, false)
    ));

  return { earnedBadges, availableBadges };
}



// import  db  from "@/core/db/index_db"; // Assuming the db instance from drizzle-orm
// import { eq, and } from "drizzle-orm";
// import { Badge, User, UserBadge } from "@/core/db/schema/index_schema"; // Importing the schema definitions

// // Function to get badges for a specific user
// export async function getUserBadges(userId: number) {
//   // Fetch earned badges (badges the user has earned)
//   const earnedBadges = await db
//     .select({
//       badgeId: Badge.badge_id,
//       title: Badge.title,
//       description: Badge.description,
//       imageUrl: Badge.imageUrl,
//       earnedAt: UserBadge.earnedAt,
//     })
//     .from(UserBadge)
//     .innerJoin(Badge, eq(UserBadge.badge_id, Badge.badge_id))
//     .where(eq(UserBadge.user_id, userId)); // Fetch badges earned by this user

//   // Fetch available badges (badges the user has not earned yet)
//   const availableBadges = await db
//     .select({
//       badgeId: Badge.badge_id,
//       title: Badge.title,
//       description: Badge.description,
//       requirements: Badge.requirements,
//     })
//     .from(Badge)
//     .leftJoin(UserBadge, eq(Badge.badge_id, UserBadge.badge_id))
//     .where(and(eq(UserBadge.user_id, userId), eq(UserBadge.badge_id, null))); // Badges not yet earned by the user

//   return { earnedBadges, availableBadges };
// }




// import  db  from "@/core/db/index_db";  // Drizzle database instance
// import { UserBadge, Badge, UserBadgeModel, BadgeModel } from "@/models";
// import { eq, and } from "drizzle-orm";
s``
// // Function to get badges for a user
// export async function getUserBadges(userId: number) {
//   // Fetch badges the user has earned
//   const earnedBadges = await db
//     .select({
//       id: UserBadgeModel.table.user_badge_id,
//       title: BadgeModel.table.title,
//       description: BadgeModel.table.description,
//       imageUrl: BadgeModel.table.imageUrl,
//       earnedAt: UserBadgeModel.table.earnedAt,
//     })
//     .from(UserBadgeModel.table)
//     .innerJoin(BadgeModel.table, eq(UserBadgeModel.table.badge_id, BadgeModel.table.badge_id))
//     .where(eq(UserBadgeModel.table.user_id, userId));

//   // Fetch badges that are available but not earned yet by this user
//   const availableBadges = await db
//     .select({
//       id: BadgeModel.table.badge_id,
//       title: BadgeModel.table.title,
//       description: BadgeModel.table.description,
//       requirements: BadgeModel.table.requirements,
//     })
//     .from(BadgeModel.table)
//     .leftJoin(UserBadgeModel.table, eq(UserBadgeModel.table.badge_id, BadgeModel.table.badge_id))
//     .where(and(eq(UserBadgeModel.table.user_id, userId), eq(UserBadgeModel.table.badge_id, null)));

//   return {
//     earnedBadges,
//     availableBadges,
//   };
// }

// import db from '@/core/db/index_db';
// import { Badge, UserBadge } from '@/core/db/schema/index_schema';
// import {  AddNewBadgeType, UpdateBadgeType, BadgeResponse } from '@/core/models/badge_model';
// import {eq, and} from 'drizzle-orm';

// export const AddBadge = async (data: AddNewBadgeType) => {
//     try {
//         const response = await db.insert(Badge)
//             .values({
//                 title: data.title,
//                 description: data.description,
//                 imageUrl: data.imageUrl,
//                 requirements: data.requirements,
//             })
//             .returning();
//         return response;
//     } catch (error: any) {
//         throw new Error('Failed to add badge: ' + error.message);
//     }
// };

// export const GetAllBadge = async () => {
//     try {
//         const response = await db.query.Badge.findMany({
//             orderBy: (badges, { asc }) => [asc(badges.title)],
//         });
//         return response;
//     } catch (error: any) {
//         throw new Error('Failed to get all badges: ' + error.message);
//     }
// };

// export const GetBadgeById = async (id: number) => {
//     try {
//         const response = await db.query.Badge.findFirst({
//             where: (badge, { eq }) => eq(badge.badge_id, id),
//         });
//         if (!response) {
//             throw new Error('Badge not found');
//         }
//         return response;
//     } catch (error: any) {
//         throw new Error('Failed to get badge by id: ' + error.message);
//     }
// };

// export const GetUserBadges = async (userId: number) => {
//     // Fetch earned badges
//     const earnedBadges = await db
//       .select({
//         id: UserBadge.badge_id,
//         title: Badge.title,
//         description: Badge.description,
//         imageUrl: Badge.imageUrl,
//         earnedAt: UserBadge.earnedAt,
//       })
//       .from(UserBadge)
//       .leftJoin(Badge, Badge.badge_id.eq(UserBadge.badge_id))
//       .where(UserBadge.user_id.eq(userId));
  
//     // Fetch available badges
//     const availableBadges = await db
//       .select({
//         id: Badge.badge_id,
//         title: Badge.title,
//         description: Badge.description,
//         requirements: Badge.requirements,
//       })
//       .from(Badge)
//       .where(
//         Badge.badge_id.notIn(
//           db
//             .select(UserBadge.badge_id)
//             .from(UserBadge)
//             .where(UserBadge.user_id.eq(userId))
//         )
//       );
  
//     return { earnedBadges, availableBadges };
//   };

// export const UpdateBadge = async (id: number, data: UpdateBadgeType) => {
//     try {
//         const response = await db
//             .update(Badge)
//             .set({
//                 title: data.title,
//                 description: data.description,
//                 imageUrl: data.imageUrl,
//                 requirements: data.requirements,
//                 updatedat: new Date(),
//             })
//             .where(eq(Badge.badge_id, id))
//             .returning();
//         return response;
//     } catch (error: any) {
//         throw new Error('Failed to update badge: ' + error.message);
//     }
// };

// export const DeleteBadge = async (id: number) => {
//     try {
//         // First delete related user_badge entries
//         await db.delete(UserBadge)
//             .where(eq(UserBadge.badge_id, id));
            
//         // Then delete the badge
//         const response = await db.delete(Badge)
//             .where(eq(Badge.badge_id, id))
//             .returning();
//         return response;
//     } catch (error: any) {
//         throw new Error('Failed to delete badge: ' + error.message);
//     }
// };

// export const AddBadge = async (data : AddNewBadgeType) => {
//     try {
//        const response = await db.insert(Badge)
//        .values ({
//         title: data.title,
//         description: data.description,
//         image: data.image,
//        })
// .returning();
// return response;

//     } catch (error: any) {
//         throw new Error('Failed to add badge' + error.mesasge);
//     }
// };

// export const GetAllBadge = async () => {
//     try {
//         const response = await db.query.Badge.findMany();
//         return response;
//     } catch (error: any) {
//         throw new Error('Failed to get all badges ' + error.message);
//     }

// };

// export const GetBadgetById = async (id : number) => {
//     try {
//         const response = await db.query.Badge.findFirst({
//             where: (user,{eq}) => eq(user.badge_id,id),
//         });
//         return response;
//     } catch (error : any ) {
//         throw new Error('Failed to get user by id ' + error.message);
        
//     }
// };

// export const UpdateBadge = async (id : number, data : UpdateBadgeType ) => {
//     try {
//          const response = await db
//         .update(Badge)
//         .set({
//             title: data.title,
//             description: data.description,
//             image: data.image,
//         })
//         .where(eq(Badge.badge_id, id));
//         return response;
//     } catch (error:any) {
//          throw new Error('Failed to update badge ' + error.message);
//     }
// };

// export const DeleteBadge = async ( id : number) => {
//     try {
//         const response = await db.delete(Badge).where(eq(Badge.badge_id, id));
//         return response;
//     } catch (error: any) {
//         throw new Error('Failed to delete badge ' + error.message);
//     }
// };

