import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate.js'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository.js'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository.js'
import { CreateOrganizationUseCase } from './create-organization.js'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: AuthenticateUseCase
let createSut: CreateOrganizationUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    organizationsRepository = new InMemoryOrganizationsRepository(petsRepository)
    sut = new AuthenticateUseCase(organizationsRepository)
    createSut = new CreateOrganizationUseCase(organizationsRepository)
  })
  it('should be able to authenticate', async () => {
    await createSut.execute({
      name: 'JS Organization',
      email: 'jsorganization@example.com',
      description: 'JavaScript Organization',
      zipCode: '76271-980',
      whatsappNumber: '(11) 99999-9999',
      password: '123456'
    })

    const { organization } = await sut.execute({
      email: 'jsorganization@example.com',
      password: '123456'
    })

    expect(organization.id).toEqual(expect.any(Number))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'john.doe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await createSut.execute({
      name: 'JS Organization',
      email: 'jsorganization@example.com',
      description: 'JavaScript Organization',
      zipCode: '76271-980',
      whatsappNumber: '(11) 99999-9999',
      password: '123456'
    })

    await expect(() =>
      sut.execute({
        email: 'jsorganization@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
