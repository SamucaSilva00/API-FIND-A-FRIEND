import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository.js'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found.js'
import { GetPetDetailsUseCase } from './get-pet-details.js'
import { CreatePetUseCase } from './create-pet.js'
import { inMemoryCreatePet } from '@/utils/test/in-memory-create-pet.js'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: GetPetDetailsUseCase
let createSut: CreatePetUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository(petsRepository)
    petsRepository = new InMemoryPetsRepository(organizationRepository)
    sut = new GetPetDetailsUseCase(petsRepository)
    createSut = new CreatePetUseCase(petsRepository, organizationRepository)
  })

  it('should be able to get pet details', async () => {
    const { pet } = await inMemoryCreatePet(organizationRepository, createSut)

    const { pet: petDetails } = await sut.execute({ id: pet.id })

    expect(petDetails.id).toEqual(expect.any(Number))
    expect(petDetails.name).toEqual('Buddy')
  })


  it('should not be able to get pet details for non-existent pet', async () => {
   await expect(() =>
      sut.execute({ id: 12 }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
