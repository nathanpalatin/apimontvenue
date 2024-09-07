import '@fastify/jwt'

declare module '@fastify/jwt' {
	interface FastifyJWT {
		payload: {
			userId: string
			role: string
		}
	}
}
