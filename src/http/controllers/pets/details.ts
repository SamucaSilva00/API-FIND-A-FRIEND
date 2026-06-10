import { MakeGetPetDetailUseCase } from '@/use-cases/factories/make-get-pet-detail-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const detailsPetParamsSchema = z.object({
    petId: z.coerce.number().min(1),
  })

  const { petId } = detailsPetParamsSchema.parse(request.params)

  const getPetDetail = MakeGetPetDetailUseCase()
  const { pet } = await getPetDetail.execute({
    id: petId,
  })

  return reply.status(200).send({ ...pet, password_hash: undefined })
}
