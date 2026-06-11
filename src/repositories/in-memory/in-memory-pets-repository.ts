import { Pet, Prisma } from 'generated/prisma/client.js'
import {
  FindManyPetsParams,
  PetsRepository,
  PetWithOrganization,
} from '../pets-repository.js'
import { InMemoryOrganizationsRepository } from './in-memory-organizations-repository.js'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private organizationsRepository: InMemoryOrganizationsRepository) {}
  
  async findMany(params: FindManyPetsParams) {
    const pets = this.items.filter((pet) => {
      const organization = this.organizationsRepository.items.find((org) => org.id === pet.org_id)
  
      if (!organization) return false
  
      if (organization.city !== params.city) return false
      if (organization.state !== params.state) return false
  
      if (params.age != null && pet.age !== params.age) return false
      if (params.size && pet.size !== params.size) return false
      if (params.type && pet.type !== params.type) return false
      if (params.energy_level && pet.energy_level !== params.energy_level) return false
      if (params.independence_level && pet.independence_level !== params.independence_level) return false
  
      return true
    })
  
    return pets
  }
  
  async findById(id: number): Promise<PetWithOrganization | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    const organization = await this.organizationsRepository.findById(pet.org_id)

    if (!organization) {
      return null
    }

    return {
      ...pet,
      organization,
    }
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? this.items.length + 1,
      name: data.name,
      description: data.description ?? null,
      type: data.type,
      age: data.age ?? null,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      created_at: new Date(),
      updated_at: new Date(),
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }
}
