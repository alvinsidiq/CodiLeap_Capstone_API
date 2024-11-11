import { Hono } from 'hono'
import { logger } from 'hono/logger'
import postsRoutes from './post_route'
import {csrf} from "hono/csrf"

export const routes = (app: Hono) => {
    app.use('*', logger())
    app.use('*', csrf({ origin: 'localhost' }))

    app.get('/health', c =>
      c.json({
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date(),
      }),
    )
  
    app.route("/posts",postsRoutes )
  }