import { FastifyInstance } from "fastify"
import { create } from "./create"
import { profile } from "./profile"
import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { refresh } from "./refresh"
import { authenticate } from "./authenticate"


export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', create)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJwt] }, profile) 
}
