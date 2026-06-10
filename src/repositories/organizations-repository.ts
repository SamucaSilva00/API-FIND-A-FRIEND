import { Organization, Prisma } from "generated/prisma/client"

export type OrganizationWithPets = Prisma.OrganizationGetPayload<{
  include: {
    pets: true
  }
}>

export interface OrganizationsRepository {
  findById(id: number): Promise<OrganizationWithPets | null>
  findByEmail(email: string): Promise<Organization | null>
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
}
