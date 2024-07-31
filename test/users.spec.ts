import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Users routes', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to create a new user', async () => {
		await request(app.server)
			.post('/users')
			.send({
				name: 'Nathan',
				email: 'emaileee@nathan.com',
				username: 'nathanpalatin',
				createdAt: new Date(),
				updatedAt: new Date(),
				password: 'Tudo@2020',
				phone: '47999999999'
			})
			.expect(201)
	})
})
