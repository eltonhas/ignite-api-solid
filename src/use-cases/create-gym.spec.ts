import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should to be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym Test',
      description: null,
      phone: null,
      latitude: -10.9453516,
      longitude: -37.0722295,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
