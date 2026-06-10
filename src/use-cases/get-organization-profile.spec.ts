import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository.js'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found.js'
import { GetPetDetailsUseCase } from './get-pet-details.js'
import { inMemoryCreatePet } from '@/utils/test/in-memory-create-pet.js'
import { GetOrganizationProfileUseCase } from './get-organization-profile.js'
import { CreateOrganizationUseCase } from './create-organization.js'

let organizationRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetOrganizationProfileUseCase
let createSut: CreateOrganizationUseCase

describe('Get Organization Profile Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository(organizationRepository)
    organizationRepository = new InMemoryOrganizationsRepository(petsRepository)
    sut = new GetOrganizationProfileUseCase(organizationRepository)
    createSut = new CreateOrganizationUseCase(organizationRepository)
  })

  //@todo: implementar corretamente esse teste
  // it('should be able to get organization profile', async () => {
  //   const { organization: created } = await createSut.execute({
  //       name: 'JS Organization',
  //       email: 'jsorganization@example.com',
  //       description: 'JavaScript Organization',
  //       zipCode: '76271-980',
  //       whatsappNumber: '(11) 99999-9999',
  //       password: '123456'
  //   })
  
  //   const { organization } = sut.execute({ id: created.id })

  //   expect(organizationProfile.id).toEqual(expect.any(Number))
  //   expect(organizationProfile).toHaveLength(1)
  // })


  it('should not be able to get pet details for non-existent pet', async () => {
   await expect(() =>
      sut.execute({ id: 12 }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
