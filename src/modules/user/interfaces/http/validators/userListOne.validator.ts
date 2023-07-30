import { IsString, IsNotEmpty, MinLength } from 'class-validator'

export class UserListOneValidator {
	/*
	 * Patron de diseño: Pattern decorator
	 * https://refactoring.guru/es/design-patterns/decorator
	 */
	@IsString({ message: 'The Guid must be a string' })
	@IsNotEmpty({ message: 'Guid must no be empty' })
	@MinLength(10, { message: 'The Guid must be 10 characters long' })
	guid: string
}
