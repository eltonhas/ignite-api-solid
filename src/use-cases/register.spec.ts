import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should to be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456789',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456789',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456789',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not to be able to register with the same email twice', async () => {
    const email = 'johndoe@example.com'
    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456789',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
