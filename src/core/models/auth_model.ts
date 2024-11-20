import { z } from "zod";

// Validation Schemas register 
export const RegisterRequest = z.object({
  email: z.string().email({ message: "email should be a valid email" }),
  password: z.string().min(8, { message: "password should be at least 8 characters" }),
}).strict();


// Validation Schemas login 
export const LoginRequest = z.object({
  email: z.string().email({ message: "email should be a valid email" }),
  password: z.string().min(8, { message: "password is required" }),
}).strict();

// mendefinisikan response dari data yang di kirim 

//response register 
export type RegisterResponseType = {
    id : number ,
    email : string,
    status : string,
    createdAt : Date,
    updatedAt : Date,
}

// response login 
export type LoginResponseType = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
  
// Type Definitions

//request type register
export type RegisterUserRequestType = z.infer<typeof RegisterRequest>;

//request type login 
export type LoginRequestType = z.infer<typeof LoginRequest>;




