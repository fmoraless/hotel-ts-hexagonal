import { IEntity } from '../../shared/entity.interface'
import { EmailVO } from './value-objects/email.VO'

interface UserRequired {
	name: string
	lastname: string
	email: EmailVO
	password: string
}

interface UserOptional {
	active: boolean
	guid: string
}

interface UserUpdate {
	name: string
	lastname: string
	password: string
}

export type UserProperties = Required<UserRequired> & Partial<UserOptional>

export default class User implements IEntity<UserProperties, UserUpdate> {
	private name: string
	private lastname: string
	private readonly email: EmailVO
	private password: string
	private active: boolean
	private readonly guid: string

	constructor(userProperties: UserProperties) {
		this.active = true
		Object.assign(this, userProperties)
	}

	properties(): UserProperties {
		return {
			name: this.name,
			lastname: this.lastname,
			email: this.email,
			password: this.password,
			active: this.active,
			guid: this.guid,
		}
	}

	update(fields: UserUpdate) {
		Object.assign(this, fields)
	}

	delete() {
		this.active = false
	}
}
