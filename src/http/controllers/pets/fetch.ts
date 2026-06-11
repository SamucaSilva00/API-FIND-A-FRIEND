import { MakeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PetLevel, Size } from 'generated/prisma/enums'
import z from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
    state: z.string(),
    age: z.coerce.number().nullish(), 
    size: z.enum(Size).nullish(),
    energyLevel: z.enum(PetLevel).nullish(),
    independenceLevel: z.enum(PetLevel).nullish(),
    type: z.string().nullish(),
  })

    
  const filters = fetchPetsQuerySchema.parse(request.query)

  const fetchPets = MakeFetchPetsUseCase()
  const { pets } = await fetchPets.execute({
    city: filters.city,
    state: filters.state,
    age: filters.age ?? null,
    size: filters.size ?? null,
    energyLevel: filters.energyLevel ?? null,
    independenceLevel: filters.independenceLevel ?? null,
    type: filters.type ?? null,
  })

  return reply.status(200).send({ pets })
}
