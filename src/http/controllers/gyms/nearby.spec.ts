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

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUsers(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some descroption',
        phone: '79999043059',
        latitude: -10.9453516,
        longitude: -37.0722295,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Some descroption',
        phone: '79999043059',
        latitude: -11.3260714,
        longitude: -37.3505104,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -10.9453516,
        longitude: -37.0722295,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })
})
