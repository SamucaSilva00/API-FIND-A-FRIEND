import { prisma } from '@/lib/prisma.js'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(
  app: FastifyInstance,
) {
  const organization = await prisma.organization.create({
    data: {
      name: "teste",
      email: "teste.user@example.com",
      description: "teste de organization",
      zip_code: "27343-270",
      city: "Barra Mansa",
      state: "RJ",
      street: "Alameda Atanalpa Oliveira Martins",
      neighborhood: "Abelhas",
      whatsapp_number: "41992364522",
      password_hash: await hash('123456', 6),
    }
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: `teste.user@example.com`,
    password: '123456',
  })

  const { token } = authResponse.body

  return { token, organization }
}
