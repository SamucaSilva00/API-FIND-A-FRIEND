import { Pet, Prisma } from 'generated/prisma/client.js'
import { FindManyPetsParams, PetsRepository } from '../pets-repository.js'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  
    findMany(params: FindManyPetsParams): Promise<Pet[]> {
      throw new Error('Method not implemented.')
    }
  
  async findById(id: number) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
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
