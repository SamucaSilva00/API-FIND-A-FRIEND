import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app.js'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get organization profile', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const profileReponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileReponse.statusCode).toEqual(200)
    expect(profileReponse.body).toEqual(
      expect.objectContaining({
        email: expect.stringContaining('teste.user'),
      }),
    )
  })
})
