import { MakeGetOrganizationProfileUseCase } from '@/use-cases/factories/make-get-organization-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrganizationProfile = MakeGetOrganizationProfileUseCase()
  const { organization } = await getOrganizationProfile.execute({
    id: request.user.sign.sub,
  })

  return reply.status(200).send({ ...organization, password_hash: undefined })
}
