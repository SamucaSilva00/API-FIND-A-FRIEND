import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app.js'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    const { token, organization } = await createAndAuthenticateOrganization(app)

    const createdPet = await request(app.server).post('/pets').set('Authorization', `Bearer ${token}`).send({
      name: 'testinho',
      description: 'testinho é um teste',
      type: 'dog',
      age: 2,
      size: 'SMALL',
      energyLevel: 'HIGH',
      independenceLevel: 'LOW',
      orgId: organization.id,
    })
    
    const pet = await request(app.server)
      .get(`/pets/${createdPet.body.pet.pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(pet.statusCode).toEqual(200)
    expect(pet.body).toEqual(
      expect.objectContaining({
        name: expect.stringContaining('testinho'),
      }),
    )
  })
})
