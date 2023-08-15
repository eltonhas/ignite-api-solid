import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeFetchUsersCheckInHistory } from '../../../use-cases/factory/make-fetch-users-check-in-history'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchUsersCheckInHistoryUseCase = makeFetchUsersCheckInHistory()

  const { checkIns } = await fetchUsersCheckInHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({ checkIns })
}
