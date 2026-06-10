import { OrganizationUncheckedCreateInput } from 'generated/prisma/models.js'
import { prisma } from '@/prisma'
import { OrganizationsRepository } from '../organizations-repository.js'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findById(id: number) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
      include: {
        pets: true,
      },
    })
    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })
    return organization
  }

  async create(data: OrganizationUncheckedCreateInput) {
    const organization = await prisma.organization.create({ data })

    return organization
  }
}
