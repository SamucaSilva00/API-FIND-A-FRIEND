import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization.js'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository.js'
import { InvalidZipCodeError } from './errors/invalid-zip-code.js'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists.js'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository.js'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    organizationsRepository = new InMemoryOrganizationsRepository(petsRepository)
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create organization', async () => {
    const { organization } = await sut.execute({
      name: 'JS Organization',
      email: 'jsorganization@example.com',
      description: 'JavaScript Organization',
      zipCode: '76271-980',
      whatsappNumber: '(11) 99999-9999',
      password: '123456'
    })

    expect(organization.id).toEqual(expect.any(Number))
  })

  it('should not be able to create organization without a valid zip code', async () => {
   await expect(() =>
      sut.execute({
        name: 'JS Organization',
        email: 'jsorganization@example.com',
        description: 'JavaScript Organization',
        zipCode: '1234',
        whatsappNumber: '(11) 99999-9999',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(InvalidZipCodeError)
  })

  it('should not be able to create organization with same email', async () => {
    await sut.execute({
      name: 'JS Organization',
      email: 'jsorganization@example.com',
      description: 'JavaScript Organization',
      zipCode: '76271-980',
      whatsappNumber: '(11) 99999-9999',
      password: '123456'
    })

    await expect(() =>
      sut.execute({
        name: 'Another Organization',
        email: 'jsorganization@example.com',
        description: 'Another Organization',
        zipCode: '76271-980',
        whatsappNumber: '(11) 99999-9999',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
