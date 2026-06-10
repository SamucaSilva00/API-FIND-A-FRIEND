import { MakeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { PetLevel, Size } from 'generated/prisma/client'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    type: z.string(),
    age: z.number().nullable(),
    size: z.enum(Size),
    energyLevel: z.enum(PetLevel),
    independenceLevel: z.enum(PetLevel),
    orgId: z.number(),
  })

  const { name, description, type, age, size, energyLevel, independenceLevel, orgId } = createPetBodySchema.parse(request.body)

  const petUseCase = MakeCreatePetUseCase()
  await petUseCase.execute({
    name,
    description,
    type,
    age,
    size,
    energyLevel,
    independenceLevel,
    orgId,
  })

  return reply.status(201).send()
}
