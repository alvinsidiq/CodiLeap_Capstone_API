/*
File utama aplikasi, yang menjalankan server dan menghubungkan semua modul.
*/

import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { routes } from "./route/index_route";

const app = new Hono();

routes(app);

app.onError((error, c) => {
  console.log("Error", error);

  if (error instanceof ZodError) {
    console.log("Zod Error", error);

    return c.json({ error, message: error.message }, { status: 403 });
  }

  if (error instanceof HTTPException) {
    return c.json(
      {
        message: error.message,
        statusCode: error.status,
      },
      error.status
    );
  }
  console.error(error);
  return c.json(
    { error, message: error.message || "Custom Error Message" },
    StatusCodes.INTERNAL_SERVER_ERROR
  );
});

app.notFound((c) => {
  console.error(`not found${c}`);
  return c.json(
    {
      message: "Not Found",
      httpStatus: 404,
    },
    StatusCodes.NOT_FOUND
  );
});

export default app;
