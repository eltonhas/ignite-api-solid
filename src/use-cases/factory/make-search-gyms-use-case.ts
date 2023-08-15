import { SearchGymUseCase } from '../search-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repositories'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(gymsRepository)

  return useCase
}
