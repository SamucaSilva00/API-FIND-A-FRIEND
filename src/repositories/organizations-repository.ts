import { Organization, Prisma } from "generated/prisma/client"

export interface OrganizationsRepository {
  findById(id: number): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
}
