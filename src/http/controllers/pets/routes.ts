import { FastifyInstance } from "fastify"
import { create } from "./create"
import { details } from "./details"
import { fetch } from "./fetch"


export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', create)
  app.get('/pets', fetch)
  app.get('/pets/:petId', details)
}
