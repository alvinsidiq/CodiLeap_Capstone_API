/*Folder yang berisi definisi rute, yaitu endpoint yang dapat diakses oleh pengguna. */

import { Hono } from "hono";
import { logger } from "hono/logger";
import postsRoutes from "./post_route";
import { csrf } from "hono/csrf";
import userRoutes from "./user_learn_route";
import userLearn from "./user_learn_route";
import learningPathRoutes from "./learning_path_routes";
import auth from "./auth_routes";

export const routes = (app: Hono) => {
  app.use("*", logger());
  app.use("*", csrf({ origin: "localhost" }));

  app.get("/health", (c) =>
    c.json({
      uptime: process.uptime(),
      message: "Ok",
      date: new Date(),
    })
  );

  app.route("/posts", postsRoutes);

  app.route("/users", userRoutes);

  app.route("/learn", userLearn);
  app.route("/learningpath", learningPathRoutes);
  app.route ("/auth", auth);
};
