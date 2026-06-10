import { ResourceNotFoundError } from "./errors/resource-not-found"
import {
  OrganizationsRepository,
  OrganizationWithPets,
} from "@/repositories/organizations-repository"

interface GetOrganizationProfileUseCaseRequest {
  id: number
}

interface GetOrganizationProfileUseCaseResponse {
  organization: OrganizationWithPets
}


export class GetOrganizationProfileUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({ id }: GetOrganizationProfileUseCaseRequest): Promise<GetOrganizationProfileUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(id)

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    return { organization }
  }
}
