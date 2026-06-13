import { FindManyPetsParams, PetsRepository } from '../pets-repository.js'
import { PetUncheckedCreateInput } from 'generated/prisma/models.js'
import { prisma } from '@/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findMany(params: FindManyPetsParams) {
    const pets = await prisma.pet.findMany({
      where: {
        ...(params.age && { age: params.age }),
        ...(params.size && { size: params.size }),
        ...(params.type && { type: params.type }),
        ...(params.energy_level && { energy_level: params.energy_level }),
        ...(params.independence_level && { independence_level: params.independence_level }),
        organization: {
          city: params.city,
          state: params.state,
        },
      }
    })
    return pets
  }

  async findById(id: number) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        organization: true
      },
    })
    return pet
  }

  async create(data: PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }
}
