import { Pet, PetLevel, Prisma, Size } from "generated/prisma/client"

export interface FindManyPetsParams {
  city: string
  age?: number
  size?: Size
  energy_level?: PetLevel
  independence_level?: PetLevel
  type?: string
}

export type PetWithOrganization = Prisma.PetGetPayload<{
  include: {
    organization: true
  }
}>

export interface PetsRepository {
  findMany(params: FindManyPetsParams): Promise<Pet[]>
  findById(id: number): Promise<PetWithOrganization | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
