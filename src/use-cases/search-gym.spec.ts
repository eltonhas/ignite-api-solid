import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gym'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should to be able to search for gyms', async () => {
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
      latitude: -10.9453516,
      longitude: -37.0722295,
    })

    const { gyms } = await sut.execute({
      query: '2',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Gym Test 2' })])
  })

  it('should to be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym Test ${i}`,
        description: null,
        phone: null,
        latitude: -10.9453516,
        longitude: -37.0722295,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym Test',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym Test 21' }),
      expect.objectContaining({ title: 'Gym Test 22' }),
    ])
  })
})
