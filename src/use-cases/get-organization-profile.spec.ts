import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository.js'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found.js'
import { GetOrganizationProfileUseCase } from './get-organization-profile.js'
import { CreateOrganizationUseCase } from './create-organization.js'

let organizationRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetOrganizationProfileUseCase
let createSut: CreateOrganizationUseCase

describe('Get Organization Profile Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository(petsRepository)
    petsRepository = new InMemoryPetsRepository(organizationRepository)
    sut = new GetOrganizationProfileUseCase(organizationRepository)
    createSut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('should be able to get organization profile', async () => {
    const { organization: created } = await createSut.execute({
      name: 'JS Organization',
      email: 'jsorganization@example.com',
      description: 'JavaScript Organization',
      zipCode: '76271-980',
      whatsappNumber: '(11) 99999-9999',
      password: '123456',
    })

    const { organization } = await sut.execute({ id: created.id })

    expect(organization.id).toEqual(created.id)
    expect(organization.email).toEqual('jsorganization@example.com')
    expect(organization.pets).toEqual([])
  })

  it('should not be able to get organization profile for non-existent organization', async () => {
    await expect(() =>
      sut.execute({ id: 12 }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
