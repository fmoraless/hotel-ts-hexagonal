import { UserProperties } from 'src/modules/user/domain/user'
import { DTO } from './dto.generic'

interface UserOneDTO {
	name: string
	lastname: string
	email: string
	guid: string
}

export type UserListOneDTO = UserOneDTO

export class UserListOneMapping extends DTO<UserProperties, UserListOneDTO> {
	execute(data: UserProperties): UserListOneDTO {}
}
