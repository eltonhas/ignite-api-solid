import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearByGymUseCase } from './fetch-near-by-gym'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearByGymUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymUseCase(gymsRepository)
  })

  it('should to be able to fetch nearbby gyms', async () => {
    await gymsRepository.create({
      title: 'Gym Test',
      description: null,
      phone: null,
      latitude: -10.9453516,
      longitude: -37.0722295,
    })
    await gymsRepository.create({
      title: 'Gym Test 2',
      description: null,
      phone: null,
      latitude: -11.3260714,
      longitude: -37.3505104,
    })

    const { gyms } = await sut.execute({
      userLatitude: -10.9453516,
      userLongitude: -37.0722295,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Gym Test' })])
  })
})
