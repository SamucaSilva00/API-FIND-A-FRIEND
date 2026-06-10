import { FastifyInstance } from "fastify"
import { create } from "./create"
import { details } from "./details"


export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', create)
  app.get('/pets/:petId', details)
}
