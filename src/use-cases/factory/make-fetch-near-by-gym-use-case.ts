import { FetchNearByGymUseCase } from '../fetch-near-by-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repositories'

export function makeFetchNearByGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearByGymUseCase(gymsRepository)

  return useCase
}
