import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credential-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should to be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password_hash: await hash('123456789', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com.br',
      password: '123456789',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not to be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com.br',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not to be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password_hash: await hash('123456789', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com.br',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
