import { FastifyInstance } from "fastify"
import { create } from "./create"
import { details } from "./details"
import { fetch } from "./fetch"
import { verifyJwt } from "@/http/middlewares/verify-jwt"


export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJwt] }, create)
  app.get('/pets', fetch)
  app.get('/pets/:petId', details)
}
