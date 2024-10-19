import { PrismaUsersRepository } from '../../repositories/prisma/prisma-user-repository'
import { DeleteAccountUseCase } from '../delete-account'

export function makeDeleteAccountUseCase() {
	const usersRepository = new PrismaUsersRepository()
	const useCase = new DeleteAccountUseCase(usersRepository)

	return useCase
}
