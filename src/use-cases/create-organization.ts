import { OrganizationsRepository } from "@/repositories/organizations-repository"
import { Organization } from "generated/prisma/client"
import { hash } from "bcryptjs"
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists"
import { getLocaleInfos } from "@/utils/get-locale-infos"
import { InvalidZipCodeError } from "./errors/invalid-zip-code"

interface CreateOrganizationUseCaseRequest {
  name: string
  email: string
  description: string 
  zipCode: string
  whatsappNumber: string
  password: string
}


interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    description,
    zipCode,
    whatsappNumber,
    password
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.organizationsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const localeInfos = await getLocaleInfos(zipCode)

    if (!localeInfos) {
      throw new InvalidZipCodeError()
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      description,
      zip_code: zipCode,
      city: localeInfos.city,
      state: localeInfos.state,
      street: localeInfos.street,
      neighborhood: localeInfos.neighborhood,
      whatsapp_number: whatsappNumber,
      password_hash,
    })

    return { organization }
  }
}
