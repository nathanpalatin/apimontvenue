import { randomUUID } from 'node:crypto'

import { Users, Prisma } from '@prisma/client'
import type { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
	public items: Users[] = []
	async findByPhone(phone: string): Promise<Users | null> {
		const user = this.items.find(item => item.phone === phone)

		if (!user) {
			return null
		}

		return user
	}

	async findByCPF(cpf: string): Promise<Users | null> {
		const user = this.items.find(item => item.cpf === cpf)

		if (!user) {
			return null
		}

		return user
	}

	async findById(id: string) {
		const user = this.items.find(item => item.id === id)

		if (!user) {
			return null
		}

		return user
	}

	async findByEmail(email: string) {
		const user = this.items.find(item => item.email === email)

		if (!user) {
			return null
		}

		return user
	}

	async create(data: Prisma.UsersCreateInput) {
		const user = {
			id: randomUUID(),
			name: data.name,
			birthdate: data.birthdate,
			cpf: data.cpf,
			avatar: null,
			role: data.role ?? 'USER',
			emailVerified: false,
			email: data.email,
			phone: data.phone,
			password: data.password,
			createdAt: new Date(),
			updatedAt: new Date()
		}

		this.items.push(user)

		return user
	}
}
