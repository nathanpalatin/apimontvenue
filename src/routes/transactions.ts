import { FastifyInstance } from 'fastify'
import { knex } from '../database'

import { randomUUID } from 'node:crypto'
import { z } from 'zod'

export async function transactionsRoutes(app: FastifyInstance) {

  app.get('/', async () => {
    const transactions = await knex('transactions')
      .select()
    return { transactions }
  })

  app.get('/:id', async (request) => {

    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(request.params)

    const transaction = await knex('transactions')
      .where('id', id)
      .first()

    return { transaction }
  })

  app.post('/', async (request, reply) => {

    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )


    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.status(201).send('Transaction created successfully!')
  })

  app.put('/:id', async (request, reply) => {

    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { id } = getTransactionParamsSchema.parse(request.params)

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )


    await knex('transactions').update({
      title,
      amount: type === 'credit' ? amount : amount * -1,
    }).where('id', id)

    return reply.status(204).send('Transaction updated successfully!')
  })

  app.delete('/', async (_request, reply) => {
    await knex('transactions').delete()

    return reply.status(204).send('Transactions deleted successfully')
  })

  app.delete('/:id', async (request, reply) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(request.params)


    await knex('transactions')
      .delete()
      .where('id', id)

    return reply.status(204).send('Transaction deleted successfully')
  })

}