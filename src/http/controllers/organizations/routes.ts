import { FastifyInstance } from "fastify"
import { create } from "./create"
import { profile } from "./profile"


export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', create)
  //@todo: mudar pro sub depois do jwt e virar o /me
  app.get('/organizations/:organizationId', profile) 
}
