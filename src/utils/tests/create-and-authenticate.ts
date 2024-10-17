import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '../../lib/prisma'
import { hash } from 'bcrypt'
import { faker } from '@faker-js/faker'

export async function createAndAuthenticateUser(app: FastifyInstance) {
	const email = faker.internet.email()
	await prisma.users.create({
		data: {
			name: faker.person.fullName(),
			email,
			avatar: faker.image.avatarGitHub(),
			phone: faker.phone.number(),
			cpf: faker.string.numeric(11),
			birthdate: faker.date.between({ from: '2000-01-01', to: new Date() }).toISOString(),
			password: await hash('123456', 1)
		}
	})

	const authResponse = await request(app.server).post('/users/login').send({
		credential: email,
		password: '123456'
	})

	const {
		token,
		refreshToken,
		user: { userId, name }
	} = authResponse.body

	return {
		token,
		refreshToken,
		name,
		email,
		userId
	}
}
