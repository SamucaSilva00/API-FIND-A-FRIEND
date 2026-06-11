import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository.js'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository.js'
import { GetPetDetailsUseCase } from './get-pet-details.js'
import { CreatePetUseCase } from './create-pet.js'
import { inMemoryCreatePet } from '@/utils/test/in-memory-create-pet.js'
import { FetchPetsUseCase } from './fetch-pets.js'
import { CityAndStateAreRequiredError } from './errors/city-and-state-are-required.js'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: FetchPetsUseCase
let createSut: CreatePetUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository(petsRepository)
    petsRepository = new InMemoryPetsRepository(organizationRepository)
    sut = new FetchPetsUseCase(petsRepository)
    createSut = new CreatePetUseCase(petsRepository, organizationRepository)
  })

  it('should be able to fetch pets', async () => {
    const { organization } = await inMemoryCreatePet(organizationRepository, createSut)

    const { pets } = await sut.execute({ city: organization.city, state: organization.state })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Buddy' })])
  })


  it('should not be able to fetch pets without city and state', async () => {
    await expect(() =>
      sut.execute({ city: '', state: '' }),
    ).rejects.toBeInstanceOf(CityAndStateAreRequiredError)
  })
})
