import { MakeGetOrganizationProfileUseCase } from '@/use-cases/factories/make-get-organization-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileOrganizationParamsSchema = z.object({
    organizationId: z.coerce.number().min(1),
  })

  const { organizationId } = profileOrganizationParamsSchema.parse(request.params)

  const getOrganizationProfile = MakeGetOrganizationProfileUseCase()
  const { organization } = await getOrganizationProfile.execute({
    id: organizationId,
  })

  return reply.status(200).send({ ...organization, password_hash: undefined })
}
