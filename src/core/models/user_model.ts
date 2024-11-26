//import { z } from "zod";
import { User, UserBadge } from "@/core/db/schema/index_schema";
import { relations } from "drizzle-orm";

// Relasi User
export const userRelations = relations(User, ({ many }) => ({
  earnedBadges: many(UserBadge, {
    fields: [User.id],
    references: [UserBadge.userId],
  }),
}));

export const UserModel = {
  table: User,
  relations: userRelations,
};

// export const UserLearn = z.object({
//   email: z.string().email(),
//   hashed_password: z.string().min(8),
//   name: z.string().min(1),
//   telephone: z.string().optional(),
//   address: z.string().optional(),
//   dob: z.string().optional(),
//   study_hour: z.number().optional(),
// });

// export type UserLearnType = z.infer<typeof UserLearn>;

// export const RegisterUserRequest = z
//   .object({
//     email: z.string().email(),
//     password: z.string().min(8),
//   })
//   // Strict digunakan untuk memastikan bahwa tidak ada field yang tidak diinginkan
//   .strict();

// export type RegisterUserRequestType = z.infer<typeof RegisterUserRequest>;

// // Mendefinisikan tipe data yang akan dihasilkan oleh fungsi registerUser sesuai dengan api docs
// export type RegisterUserResponseType = {
//   id: number;
//   email: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

// export type UpdateUserRequestType = Partial<RegisterUserRequestType>;