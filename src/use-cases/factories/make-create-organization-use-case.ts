import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository"
import { CreateOrganizationUseCase } from "../create-organization"

export function MakeCreateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new CreateOrganizationUseCase(organizationsRepository)
  return useCase
}
