import { PetsRepository } from "@/repositories/pets-repository"
import { Pet } from "generated/prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found"

interface GetPetDetailsUseCaseRequest {
  id: number
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
