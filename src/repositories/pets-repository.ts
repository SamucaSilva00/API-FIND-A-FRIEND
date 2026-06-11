import { Pet, PetLevel, Prisma, Size } from "generated/prisma/client"

export interface FindManyPetsParams {
  city: string
  state: string
  age?: number | null
  size?: Size | null
  energy_level?: PetLevel | null
  independence_level?: PetLevel | null
  type?: string | null
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
