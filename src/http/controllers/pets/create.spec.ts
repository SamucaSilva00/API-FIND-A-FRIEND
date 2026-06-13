import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app.js'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token, organization } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server).post('/pets').set('Authorization', `Bearer ${token}`).send({
      name: 'testinho',
      description: 'testinho é um teste',
      type: 'dog',
      age: 2,
      size: 'SMALL',
      energyLevel: 'HIGH',
      independenceLevel: 'LOW',
      orgId: organization.id,
    })

    expect(response.statusCode).toEqual(201)
  })
})
