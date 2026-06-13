import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app.js'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get all pet details', async () => {
    const { token, organization } = await createAndAuthenticateOrganization(app)
    
    await request(app.server).post('/pets').set('Authorization', `Bearer ${token}`).send({
      name: 'testinho',
      description: 'testinho é um teste',
      type: 'dog',
      age: 2,
      size: 'SMALL',
      energyLevel: 'HIGH',
      independenceLevel: 'LOW',
      orgId: organization.id,
    })

    await request(app.server).post('/pets').set('Authorization', `Bearer ${token}`).send({
      name: 'gato lindo',
      description: 'testinho é um teste 2',
      type: 'cat',
      age: 2,
      size: 'LARGE',
      energyLevel: 'MEDIUM',
      independenceLevel: 'MEDIUM',
      orgId: organization.id,
    })
    
    const response = await request(app.server)
      .get('/pets')
      .set('Authorization', `Bearer ${token}`)
      .query({
        city: organization.city,
        state: organization.state,
        type: 'cat'
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.stringContaining('gato'),
        }),
      ]),
    )
  })
})
