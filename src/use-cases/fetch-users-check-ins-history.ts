import { Checkin } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUsersCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUsersCheckInsHistoryUseCaseResponse {
  checkIns: Checkin[]
}

export class FetchUsersCheckInsHistoryUseCase {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUsersCheckInsHistoryUseCaseRequest): Promise<FetchUsersCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkinsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
