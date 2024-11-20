import {
  deleteUserController,
  getUserLearnByIdController,
  getUserLearnController,
  updateUserController,
} from "@/controller/user_learn_controller";
import {
  RegisterUserRequest,
  RegisterUserResponseType,
} from "@/core/models/user_learn_model";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { ApiResponse } from "@/core/models/api_model";
import { errorValidationParser as validateErrorHandler } from "@/middleware/errorValidationParser";
import { registerUser } from "@/service/user_learn_service";
import { StatusCodes } from "http-status-codes";

const userLearn = new Hono();

userLearn.post(
  "/",
  // validateErrorHandler untuk menghandle return dari error validasi
  zValidator("json", RegisterUserRequest, validateErrorHandler), // validasi success
  async (c) => {
    // Hook untuk menghandle error validasi
    const data = c.req.valid("json");
    // langsung memanggil service pada route, tidak lagi di controller
    const response = await registerUser(data);
    return c.json(
      {
        message: "User registered successfully",
        data: response,
        // menggunakan satisfies untuk mengecek apakah response yang diberikan sesuai dengan ApiResponse<RegisterUserResponseType>
      } satisfies ApiResponse<RegisterUserResponseType>,
      StatusCodes.CREATED
    );
  }
);

// user get by id 



userLearn.get("/", getUserLearnController);

userLearn.get("/:id", getUserLearnByIdController);

userLearn.put("/:id", updateUserController);

userLearn.delete("/:id", deleteUserController);

export default userLearn;
