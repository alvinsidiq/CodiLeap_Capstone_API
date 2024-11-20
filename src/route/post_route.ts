import { Hono } from "hono";
import { getPostController } from "@/controller/post_controller";

const postsRoutes = new Hono();
// "/posts/posts"
postsRoutes.get("/", getPostController);

export default postsRoutes;
