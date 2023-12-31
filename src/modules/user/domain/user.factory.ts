import { v4 as uuidv4 } from 'uuid'
import User, { UserProperties } from './user'
import { UserPasswordService } from './services/user-password.service'
import { EmailVO } from './value-objects/email.VO'
import {
	UserLastNameRequireException,
	UserNameRequireException,
	UserPasswordRequiredException,
	UserPasswordLengthInvalidException,
} from './exceptions/user.exception'
import { err, ok, Result } from 'neverthrow'

export type UserResult = Result<
	User,
	| UserNameRequireException
	| UserLastNameRequireException
	| UserPasswordRequiredException
	| UserPasswordLengthInvalidException
>

export default class UserFactory {
	async create(name: string, lastname: string, email: EmailVO, password: string): Promise<UserResult> {
		if (!name || name.trim() === '') {
			return err(new UserNameRequireException())
		}
		if (!lastname || lastname.trim() === '') {
			return err(new UserLastNameRequireException())
		}
		if (!password || password.trim() === '') {
			return err(new UserPasswordRequiredException())
		}
		if (password.length < 5) {
			return err(new UserPasswordLengthInvalidException(password))
		}

		const passwordHash = await UserPasswordService.hash(password)

		const userProperties: UserProperties = {
			name,
			lastname,
			email,
			password: passwordHash,
			guid: uuidv4(),
		}

		const user = new User(userProperties)
		return ok(user)
	}
}
