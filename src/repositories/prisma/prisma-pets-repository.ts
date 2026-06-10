import { Pet } from 'generated/prisma/client.js'
import { FindManyPetsParams, PetsRepository } from '../pets-repository.js'
import { PetUncheckedCreateInput } from 'generated/prisma/models.js'
import { prisma } from '@/prisma'

export class PrismaPetsRepository implements PetsRepository {
  findMany(params: FindManyPetsParams): Promise<Pet[]> {
    throw new Error('Method not implemented.')
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
