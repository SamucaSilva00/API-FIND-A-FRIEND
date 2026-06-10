import { Organization, Prisma } from 'generated/prisma/client.js'
import { OrganizationsRepository } from '../organizations-repository.js'

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
  public items: Organization[] = []
  
  async findById(id: number) {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = {
      id: data.id ?? this.items.length + 1,
      name: data.name,
      email: data.email,
      description: data.description ?? null,
      zip_code: data.zip_code,
      city: data.city,
      state: data.state,
      street: data.street ?? null,
      neighborhood: data.neighborhood ?? null,
      whatsapp_number: data.whatsapp_number,
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }
}
