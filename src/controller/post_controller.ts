/*
Folder yang berisi controller, yaitu modul yang menangani request dari pengguna dan memberikan response yang sesuai.
*/

import { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { getPostService } from "@/service/post_service";

const getPostController = async (c: Context) => {
  const response = await getPostService();

  return c.json(
    {
      message: "Success get posts",
      httpStatus: StatusCodes.OK,
      data: response,
    },
    StatusCodes.OK
  );
};




export { getPostController };
