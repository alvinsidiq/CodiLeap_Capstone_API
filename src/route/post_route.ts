import { Hono } from 'hono';
import { getPostController } from '../controller/post_controller';

const postsRoutes = new Hono()

postsRoutes.get('/',getPostController )

export default postsRoutes