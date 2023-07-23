import User from '../domain/user'
import { UserRepository } from '../domain/user.repository'
import { UserEntity } from './user.entity'
import DatabaseBootstrap from '../../../bootstrap/database.bootstrap'

export default class UserInfraestructure implements UserRepository {
	async insert(user: User): Promise<User> {
		const userInsert = new UserEntity()
		const { guid, name, lastname, email, password, active } = user.properties()
		Object.assign(userInsert, {
			guid,
			name,
			lastname,
			email: email.value,
			password,
			active,
		})
		await DatabaseBootstrap.dataSource.getRepository(UserEntity).save(userInsert)

		return user
	}

	list(): Promise<User[]> {
		throw new Error('Method not implemented.')
	}
	listOne(guid: string): Promise<User> {
		throw new Error('Method not implemented.')
	}

	update(user: User): Promise<User> {
		throw new Error('Method not implemented.')
	}
	delete(guid: string): Promise<User> {
		throw new Error('Method not implemented.')
	}
}
