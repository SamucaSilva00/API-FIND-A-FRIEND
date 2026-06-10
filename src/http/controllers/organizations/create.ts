import { MakeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    description: z.string(),
    zipCode: z.string(),
    whatsappNumber: z.string(),
    password: z.string().min(6),
  })


  const { name, email, description, zipCode, whatsappNumber, password } = createOrganizationBodySchema.parse(request.body)

  const registerUseCase = MakeCreateOrganizationUseCase()
  await registerUseCase.execute({
    name,
    email,
    description,
    zipCode,
    whatsappNumber,
    password,
  })

  return reply.status(201).send()
}
