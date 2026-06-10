import { GetPetDetailsUseCase } from "../get-pet-details"
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"

export function MakeGetPetDetailUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetDetailsUseCase(petsRepository)
  return useCase
}
