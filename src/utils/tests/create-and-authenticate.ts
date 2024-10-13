import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
	await request(app.server).post('/users').send({
		name: 'John Doe',
		email: 'johndoe@example.com',
		password: '123456',
		cpf: '999.999.999-99',
		birthdate: '1993-06-14T00:00:00.000Z',
		username: 'johndoe',
		phone: '11234567890'
	})

	const authResponse = await request(app.server).post('/users/login').send({
		credential: 'johndoe',
		password: '123456'
	})

	const {
		token,
		user: { username, userId }
	} = authResponse.body

	return {
		token,
		username,
		userId
	}
}
