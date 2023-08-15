import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repositories'
import { FetchUsersCheckInsHistoryUseCase } from '../fetch-users-check-ins-history'

export function makeFetchUsersCheckInHistory() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUsersCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}
