import db from "@/core/db/index_db";
import { eq } from "drizzle-orm";
import { Auth } from "@/core/db/schema/index_schema";
import { RegisterUserRequestType, LoginRequestType,RegisterResponseType, LoginResponseType } from "@/core/models/auth_model";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";

export const RegisterAuth = async (
    data : RegisterUserRequestType
): Promise<RegisterResponseType> => {
    // cek apakah email sudah terdaftar
    const EmailReady = await db.query.Auth.findFirst({
        // mencari data email di db 
        where : (user, {eq})=> eq (user.email, data.email),
    });
  // buatkan if pengecekan data email
  if (EmailReady){
    // email sudah ada langsung return error 
    throw new HTTPException(StatusCodes.CONFLICT,{
        message : "Email sudah terdaftar",
    });
  }

// jika email belum terdaftar , maka insert user baru 
const registeredUser = await db
    .insert(Auth)
    .values({
      email: data.email,
      hashedPassword: data.password,
    })
    .returning({
        id: Auth.id,
      email: Auth.email,
      createdAt: Auth.createdAt,
      updatedAt: Auth.updatedAt,
    });
  return registeredUser[0];
};


// login Auth 
export const LoginAuth = async (data: LoginRequestType): Promise<LoginResponseType> => {
    // Check user
    const UserLogin = await db.query.Auth.findFirst({
      where: (auth, { eq }) => eq(auth.email, data.email),
    });

    if (!UserLogin) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: 'User not found'
      });
    }

    // cek password
    if (data.password !== UserLogin.hashedPassword) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, {
        message: 'Invalid password'
      });
    }

     return UserLogin;
  
};

