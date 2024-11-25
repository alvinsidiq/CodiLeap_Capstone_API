import db from '@/core/db/index_db';
import { Badge, UserBadge } from '@/core/db/schema/index_schema';
import {  AddNewBadgeType, UpdateBadgeType, BadgeResponse } from '@/core/models/badge_model';
import {eq, and} from 'drizzle-orm';

export const AddBadge = async (data: AddNewBadgeType) => {
    try {
        const response = await db.insert(Badge)
            .values({
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
                requirements: data.requirements,
            })
            .returning();
        return response;
    } catch (error: any) {
        throw new Error('Failed to add badge: ' + error.message);
    }
};

export const GetAllBadge = async () => {
    try {
        const response = await db.query.Badge.findMany({
            orderBy: (badges, { asc }) => [asc(badges.title)],
        });
        return response;
    } catch (error: any) {
        throw new Error('Failed to get all badges: ' + error.message);
    }
};

export const GetBadgeById = async (id: number) => {
    try {
        const response = await db.query.Badge.findFirst({
            where: (badge, { eq }) => eq(badge.badge_id, id),
        });
        if (!response) {
            throw new Error('Badge not found');
        }
        return response;
    } catch (error: any) {
        throw new Error('Failed to get badge by id: ' + error.message);
    }
};

export const GetUserBadges = async (userId: number) => {
    // Fetch earned badges
    const earnedBadges = await db
      .select({
        id: UserBadge.badge_id,
        title: Badge.title,
        description: Badge.description,
        imageUrl: Badge.imageUrl,
        earnedAt: UserBadge.earnedAt,
      })
      .from(UserBadge)
      .leftJoin(Badge, Badge.badge_id.eq(UserBadge.badge_id))
      .where(UserBadge.user_id.eq(userId));
  
    // Fetch available badges
    const availableBadges = await db
      .select({
        id: Badge.badge_id,
        title: Badge.title,
        description: Badge.description,
        requirements: Badge.requirements,
      })
      .from(Badge)
      .where(
        Badge.badge_id.notIn(
          db
            .select(UserBadge.badge_id)
            .from(UserBadge)
            .where(UserBadge.user_id.eq(userId))
        )
      );
  
    return { earnedBadges, availableBadges };
  };

export const UpdateBadge = async (id: number, data: UpdateBadgeType) => {
    try {
        const response = await db
            .update(Badge)
            .set({
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
                requirements: data.requirements,
                updatedat: new Date(),
            })
            .where(eq(Badge.badge_id, id))
            .returning();
        return response;
    } catch (error: any) {
        throw new Error('Failed to update badge: ' + error.message);
    }
};

export const DeleteBadge = async (id: number) => {
    try {
        // First delete related user_badge entries
        await db.delete(UserBadge)
            .where(eq(UserBadge.badge_id, id));
            
        // Then delete the badge
        const response = await db.delete(Badge)
            .where(eq(Badge.badge_id, id))
            .returning();
        return response;
    } catch (error: any) {
        throw new Error('Failed to delete badge: ' + error.message);
    }
};

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

