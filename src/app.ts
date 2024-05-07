import fastify from 'fastify'
import cookie from '@fastify/cookie'

import multipart from '@fastify/multipart'

import { postsRoutes } from './routes/posts'
import { usersRoutes } from './routes/users'
import { productsRoutes } from './routes/products'
import { transactionsRoutes } from './routes/transactions'
import { chatsRoutes } from './routes/chats'

export const app = fastify()

app.register(cookie)

app.register(multipart)

app.register(usersRoutes, {
	prefix: 'users'
})

app.register(postsRoutes, {
	prefix: 'posts'
})

app.register(chatsRoutes, {
	prefix: 'chats'
})

app.register(productsRoutes, {
	prefix: 'products'
})

app.register(transactionsRoutes, {
	prefix: 'transactions'
})
