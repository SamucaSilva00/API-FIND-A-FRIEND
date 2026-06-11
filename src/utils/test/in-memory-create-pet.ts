import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository"
import { CreatePetUseCase } from "@/use-cases/create-pet"


export async function inMemoryCreatePet(organizationRepository: InMemoryOrganizationsRepository, petSut: CreatePetUseCase) {
  const organization = await organizationRepository.create({
      name: 'JS Organization',
      email: 'jsorganization@example.com',
      description: 'JavaScript Organization',
      zip_code: '76271-980',
      city: 'Jussara',
      state: 'GO',
      street: 'Rua Principal',
      neighborhood: 'Distrito de São Sebastião do Rio Claro',
      whatsapp_number: '(11) 99999-9999',
      password_hash: '123456'
    })

  const { pet } = await petSut.execute({
    name: 'Buddy',
    description: 'A friendly dog',
    type: 'dog',
    age: 3,
    size: 'MEDIUM',
    energyLevel: 'HIGH',
    independenceLevel: 'MEDIUM',
    orgId: organization.id
  })

  return { pet, organization }
}
