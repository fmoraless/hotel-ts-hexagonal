import { v4 as uuidv4 } from "uuid";
import User, { UserProperties } from "./user";
import { UserPasswordService } from "./services/user-password.service";
import { EmailVO } from "./value-objects/email.VO";

export default class UserFactory {
	async create(name: string, lastname:string, email:EmailVO, password:string) {

		const passwordHash = await UserPasswordService.hash(password)

		const userProperties: UserProperties = {
			name,
			lastname,
			email: EmailVO,
			password: passwordHash,
			guid: uuidv4(),
		}

		const user = new User(userProperties)
		return user
	}
}
