import { Hook } from "@hono/zod-validator";

export const errorValidationParser: Hook<any, any, string> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        message: result.error.issues.map((issue) =>
          issue.code === "unrecognized_keys"
            ? `property ${issue.keys.join(", ")} should not exist`
            : issue.message
        ),
        error: "Bad Request",
        statusCode: 400,
      },
      400
    );
  }
};
