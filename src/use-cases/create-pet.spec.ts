import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository.js'
import { CreatePetUseCase } from './create-pet.js'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found.js'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new CreatePetUseCase(petsRepository, organizationRepository)
  })

  it('should be able to create pet', async () => {
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

    const { pet } = await sut.execute({
      name: 'Buddy',
      description: 'A friendly dog',
      type: 'dog',
      age: 3,
      size: 'MEDIUM',
      energyLevel: 'HIGH',
      independenceLevel: 'MEDIUM',
      orgId: organization.id
    })

    expect(pet.id).toEqual(expect.any(Number))
  })

  it('should not be able to create pet without organization', async () => {
   await expect(() =>
      sut.execute({
        name: 'Buddy',
        description: 'A friendly dog',
        type: 'dog',
        age: 3,
        size: 'MEDIUM',
        energyLevel: 'HIGH',
        independenceLevel: 'MEDIUM',
        orgId: 23333
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
