/*Folder yang berisi definisi rute, yaitu endpoint yang dapat diakses oleh pengguna. */

import { Hono } from "hono";
import { logger } from "hono/logger";
import postsRoutes from "./post_route";
import { csrf } from "hono/csrf";
import userRoutes from "./user_learn_route";
import userLearn from "./user_learn_route";
import learningPath from "./learning_path_routes";
import auth from "./auth_routes";
import badge from "./badge_route";
import lessonRoutes from "./lesson_routes";
import analytics from "./analytics_routes";
import modulesRoutes from "./modules_routes";
//import userScreaningResource from "./user_screaning_routes";
import userProgres from "./user_progres_route";
import userModulProgres from "./user_modul_progres_route";
import virtualAsistent from "./virtual_asistent_routes";
import quizAnswerChoiceRoutes from "./quiz_answer_choices_route";
import userBadge from "./user_badge_route";


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
  app.route("/learningpath", learningPath);
  app.route ("/auth", auth);
  app.route("/badge",badge);
  app.route ('/lesson',lessonRoutes);
  app.route('/analytics', analytics);
  app.route('/modules', modulesRoutes);
  //app.route('/screaning', userScreaningResource );
  app.route('/progres', userProgres);
  app.route('/modul/progres', userModulProgres );
  app.route('/virtual/asistent', virtualAsistent);
  app.route('/quiz/answer', quizAnswerChoiceRoutes);
  app.route('/user/badge', userBadge);

};
