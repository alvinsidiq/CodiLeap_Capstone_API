import db from "@/core/db/index_db";
import { UserLearn } from "@/core/db/schema/index_schema";
import {
  RegisterUserRequestType,
  RegisterUserResponseType,
  UpdateUserRequestType,
} from "@/core/models/user_model";
import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";

// PENAMAAN FILE HARUS KONSISTEN
// contoh : user_learn_service.ts ✅
//       : UserLearnService.ts ❌

// Try catch bisa dihilangkan, agar error langsung dihandle oleh hono
export const registerUser = async (
  data: RegisterUserRequestType
  // Promise digunakan untuk mengembalikan data dari async function
  // RegisterUserResponseType digunakan untuk menentukan tipe data yang di return
): Promise<RegisterUserResponseType> => {
  // cek apakah email sudah terdaftar
  const isEmailExist = await db.query.UserLearn.findFirst({
    // where digunakan untuk mencari data berdasarkan kondisi tertentu
    where: (user, { eq }) => eq(user.email, data.email),
  });

  // jika email sudah terdaftar, maka throw error
  if (isEmailExist) {
    // return langsung throw error, agar request tidak dilanjutkan
    throw new HTTPException(StatusCodes.CONFLICT, {
      message: "Email already used",
    });
  }

  // jika email belum terdaftar, maka insert user baru
  const registeredUser = await db
    .insert(UserLearn)
    .values({
      email: data.email,
      hashedPassword: data.password,
    })
    // returning digunakan untuk mengembalikan data yang sudah diinsert
    // pada parameter pertama, kita bisa menentukan field apa saja yang ingin diambil
    .returning({
      id: UserLearn.id,
      email: UserLearn.email,
      createdAt: UserLearn.createdAt,
      updatedAt: UserLearn.updatedAt,
    });
  // return langsung data yang sudah diinsert
  // karena user yang di insert hanya satu dan data yang diperlukan hanya sebuah object
  // maka kita bisa langsung mengambil index 0, yaitu data pertama
  return registeredUser[0];
};

export const getAllUsers = async () => {
  try {
    const result = await db.query.UserLearn.findMany();
    return result;
  } catch (error: any) {
    throw new Error("Failed to fetch users: " + error.message);
  }
};

export const getUserById = async (id: number) => {
  // db.delete
  // db.update
  // db.insert
  // db.query
  try {
    const result = await db.query.UserLearn.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });

    return result;
  } catch (error: any) {
    throw new Error("Failed to fetch user by ID: " + error.message);
  }
};

export const updateUser = async (id: number, data: UpdateUserRequestType) => {
  try {
    const result = await db
      .update(UserLearn)
      .set({
        email: data.email,
        name: data.name,
        telephone: data.telephone,
        address: data.address,
        dob: data.dob,
      })
      .where(eq(UserLearn.id, id));

    return result;
  } catch (error: any) {
    throw new Error("Failed to update user: " + error.message);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const result = await db.delete(UserLearn).where(eq(UserLearn.id, id));
    return result;
  } catch (error: any) {
    throw new Error("Failed to delete user: " + error.message);
  }
};

// class UserLearnService {
//     // Add a new user
//     async registerUser(data: { email: string; name: string; telephone: string; address: string; dob: string }): Promise<any> {
//         try {
//             const { email, name, telephone, address, dob } = data;
//             const result = await db.query(
//                 'INSERT INTO User_Learn(email, name, telephone, address, dob) VALUES($1, $2, $3, $4, $5) RETURNING *',
//                 [email, name, telephone, address, dob]
//             );
//             return result.rows[0];
//         } catch (error) {
//             throw new Error('Failed to add user: ' + error.message);
//         }
//     }

//     // Get all users
//     async getAllUsers(): Promise<any> {
//         try {
//             const result = await db.query('SELECT * FROM User_Learn');
//             return result.rows;
//         } catch (error) {
//             throw new Error('Failed to fetch users: ' + error.message);
//         }
//     }

//     // Get user by ID
//     async getUserById(id: number): Promise<any> {
//         try {
//             const result = await db.query('SELECT * FROM User_Learn WHERE id = $1', [id]);
//             return result.rows.length > 0 ? result.rows[0] : null;
//         } catch (error) {
//             throw new Error('Failed to fetch user by ID: ' + error.message);
//         }
//     }

//     // Update user
//     async updateUser(id: number, data: { email?: string; name?: string; telephone?: string; address?: string; dob?: string }): Promise<any> {
//         try {
//             const result = await db.query(
//                 'UPDATE User_Learn SET email = $1, name = $2, telephone = $3, address = $4, dob = $5 WHERE id = $6 RETURNING *',
//                 [data.email, data.name, data.telephone, data.address, data.dob, id]
//             );
//             return result.rows.length > 0 ? result.rows[0] : null; // Return updated user or null if not found
//         } catch (error) {
//             throw new Error('Failed to update user: ' + error.message);
//         }
//     }

//     // Delete user
//     async deleteUser(id: number): Promise<any> {
//         try {
//             const result = await db.query('DELETE FROM User_Learn WHERE id = $1 RETURNING *', [id]);
//             return result.rows.length > 0 ? result.rows[0] : null; // Return deleted user or null if not found
//         } catch (error) {
//             throw new Error('Failed to delete user: ' + error.message);
//         }
//     }
// }

// export const userLearnService = new UserLearnService();
