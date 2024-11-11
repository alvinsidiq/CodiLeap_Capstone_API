import { Hono } from 'hono';
// import { csrf } from 'hono/csrf'

import { ZodError } from 'zod';

import { routes } from './route/index_route';
import { StatusCodes } from 'http-status-codes';

const app = new Hono();

routes(app);

app.onError((error, c) => {
  if (error instanceof ZodError) {
    return c.json({ error, message: error.message }, { status: 403 });
  }
  console.error(error);
  return c.json(
    { error, message: error.message || 'Custom Error Message' },
    StatusCodes.INTERNAL_SERVER_ERROR,
  );
});

app.notFound((c) => {
  console.error(`not found${c}`);
  return c.json(
    {
      message: 'Not Found',
      httpStatus: 404,
    },
    StatusCodes.NOT_FOUND,
  );
});

export default app;
