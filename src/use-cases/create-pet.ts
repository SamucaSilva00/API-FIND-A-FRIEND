import { OrganizationsRepository } from "@/repositories/organizations-repository"
import { PetsRepository } from "@/repositories/pets-repository"
import { Pet } from "generated/prisma/client"
import { PetLevel, Size } from "generated/prisma/enums"
import { ResourceNotFoundError } from "./errors/resource-not-found"

interface CreatePetUseCaseRequest {
  name: string
  description: string | null
  type: string 
  age: number | null
  size : Size
  energyLevel: PetLevel
  independenceLevel: PetLevel
  orgId: number
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository, private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    description,
    type,
    age,
    size,
    energyLevel,
    independenceLevel,
    orgId
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const thisOrgExists = await this.organizationsRepository.findById(orgId)

    if (!thisOrgExists) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      type,
      age,
      size,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      org_id: orgId
    })

    return { pet }
  }
}
