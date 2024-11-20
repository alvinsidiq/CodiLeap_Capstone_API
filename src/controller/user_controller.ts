/*
Folder yang berisi controller, yaitu modul yang menangani request dari pengguna dan memberikan response yang sesuai.
*/

import { loginUserService} from "@/service/user_service";
import { Context } from "hono";
import { StatusCodes } from "http-status-codes";

export const getUserController = (c: Context) => {
  return c.json({
    message: "User route",
  });
};

       
export const loginUserController = async (c: Context) => {
  const body = await c.req.json();
  const email = body["email"];
  const password = body["password"];

  const isUserCanLogin = loginUserService(email, password);

  if (isUserCanLogin) {
    return c.json(
      {
        message: "Login success",
      },
      StatusCodes.OK
    );
  }

  return c.json(
    {
      message: "Login failed",
    },
    StatusCodes.UNAUTHORIZED
  );
};
