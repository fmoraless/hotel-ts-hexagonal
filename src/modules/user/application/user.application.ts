/* clase que expone los casos de uso */
import User from '../domain/user'
import { UserRepository } from '../domain/user.repository'

export default class UserApplication {
	// SOLID: Inversion de dependencias
	// DESIGN PATTERN: Inyeccion de dependencias
	constructor(private readonly userRepository: UserRepository) {}

	insert(user: User) {
		return this.userRepository.insert(user)
	}
}
