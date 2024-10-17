import { app } from '../app'

import request from 'supertest'
import { hash } from 'bcrypt'

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '../use-cases/authentication'
import { createAndAuthenticateUser } from '../utils/tests/create-and-authenticate'

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
		const userResponse = await request(app.server)
			.post('/users')
			.send({
				name: 'John Doe',
				phone: '+554799999999',
				email: 'johndoe@example.com',
				cpf: '426.315.238-73',
				birthdate: '1993-06-14',
				password: await hash('123456', 1)
			})


		expect(userResponse.statusCode).toEqual(201)
	})

	it('should be able to log in', async () => {
		await usersRepository.create({
			name: 'John Doe',
			phone: '+554799999999',
			cpf: '999.999.999-99',
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

	it('should be able to update a user', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const updateData = {
			name: 'John Updated',
			phone: '+554799988888'
		}

		const updateResponse = await request(app.server)
			.put('/users')
			.set('Authorization', `${token}`)
			.send(updateData)

		expect(updateResponse.status).toBe(204)
	})

	it('should be able to list all users', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const updateResponse = await request(app.server).get('/users').set('Authorization', `${token}`).send()

		expect(updateResponse.status).toBe(200)
	})

	it('should be able to delete a user', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const updateResponse = await request(app.server).delete('/users').set('Authorization', `${token}`).send()

		expect(updateResponse.status).toBe(204)
	})

	it('should be able to search a user', async () => {
		const { token, name } = await createAndAuthenticateUser(app)

		const updateResponse = await request(app.server)
			.get(`/users/${name}`)
			.set('Authorization', `${token}`)
			.send()

		expect(updateResponse.status).toBe(200)
	})

	it('should be able to recovery user password', async () => {
		const { email } = await createAndAuthenticateUser(app)

		const updateResponse = await request(app.server).post('/users/password').send({ credential: email })

		expect(updateResponse.status).toBe(200)
	})

	it('should be able to get my profile', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const updateResponse = await request(app.server)
			.get('/users/profile')
			.set('Authorization', `${token}`)
			.send()

		expect(updateResponse.status).toBe(200)
	})
})
