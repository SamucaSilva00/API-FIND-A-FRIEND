import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app.js'

describe('Create Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a organization', async () => {
     const response = await request(app.server).post('/organizations').send({
      name: 'test organization',
      email: 'test.org@example.com',
      description: 'A test organization',
      zipCode: '76271-980',
      whatsappNumber: '(11) 99999-9999',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
