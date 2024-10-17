import { env } from './env'

import fastify from 'fastify'
import cookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider
} from 'fastify-type-provider-zod'

import { usersRoutes } from './routes/users'

import { errorHandler } from './utils/error-handlers'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.route({
	method: 'GET',
	url: '/',
	handler: () => {
		return {
			montvenue: 'API Route montvenue.'
		}
	}
})

app.register(fastifyJwt, {
	secret: env.JWT_SECRET_KEY,
	cookie: {
		cookieName: 'refreshToken',
		signed: false
	},
	sign: {
		expiresIn: '30m'
	}
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Montvenue',
			description: 'Montvenue API Routes.',
			version: '1.0',
			contact: {
				name: 'Nathan Palatin',
				url: 'https://github.com/nathanpalatin'
			},
			license: {
				name: 'MIT',
				url: 'https://opensource.org/licenses/MIT'
			}
		}
	},
	transform: jsonSchemaTransform
})

app.register(fastifySwaggerUI, {
	routePrefix: '/docs',
	staticCSP: true,
	transformSpecification: (swaggerObject, req, reply) => {
		return swaggerObject
	},
	transformSpecificationClone: true
})

app.register(cookie)

app.register(multipart)

app.register(usersRoutes, {
	prefix: 'users'
})
