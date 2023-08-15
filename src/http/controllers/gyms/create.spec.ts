import { app } from '@/app'
import { createAndAuthenticateUsers } from '@/utils/tests/create-and-authenticate-users'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUsers(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some descroption',
        phone: '79999043059',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    expect(response.statusCode).toEqual(201)
  })
})
