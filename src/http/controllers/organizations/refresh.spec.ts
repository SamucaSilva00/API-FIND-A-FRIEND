import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app.js'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/organizations').send({
      name: 'test organization',
      email: 'test.org@example.com',
      description: 'A test organization',
      zipCode: '76271-980',
      whatsappNumber: '(11) 99999-9999',
      password: '123456',
    })
   
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'test.org@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie') as string[]

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
