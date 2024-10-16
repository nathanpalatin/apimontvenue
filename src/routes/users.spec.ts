import { app } from '../app'

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '../use-cases/authentication'
import { hash } from 'bcrypt'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Users routes (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new AuthenticateUseCase(usersRepository)
	})

	it('should be able to create a new user', async () => {
		const user = await usersRepository.create({
			name: 'John Doe',
			phone: '+554799999999',
			email: 'johndoe@example.com',
			cpf: '426.315.238-73',
			birthdate: '1993-06-14',
			password: await hash('123456', 1)
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should be able to log in', async () => {
		await usersRepository.create({
			name: 'John Doe',
			phone: '+554799999999',
			cpf: '426.315.238-73',
			birthdate: '1993-06-14',
			email: 'johndoe@example.com',
			password: await hash('123456', 1)
		})

		const { user } = await sut.execute({
			email: 'johndoe@example.com',
			password: '123456'
		})

		expect(user.id).toEqual(expect.any(String))
	})
})
