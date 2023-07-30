import { Request, Response, NextFunction } from 'express'
import { EmailVO } from '../../domain/value-objects/email.VO'
import { IError } from '../helpers/ierror'
import UserFactory from '../../domain/user.factory'
import UserApplication from '../../application/user.application'
import { UserInsertMapping } from './dto/user-insert.dto'
import { UserListMapping } from './dto/user-list.dto'
import { GuidVO } from '../../domain/value-objects/guid.vo'
import { UserListOneMapping } from './dto/user-list-one.dto'
import { UserUpdateMapping } from './dto/user-update.dto'
import { UserDeleteMapping } from './dto/user-delete.dto'
export default class {
	constructor(private application: UserApplication) {
		//
	}

	async insert(req: Request, res: Response, next: NextFunction) {
		const { name, lastname, email, password } = req.body

		const emailResult = EmailVO.create(email)
		if (emailResult.isErr()) {
			const err: IError = new Error(emailResult.error.message)
			err.status = 400 // Bad Request  // ó 411
			return next(err)
		}
		const userResult = await new UserFactory().create(name, lastname, emailResult.value, password)
		if (userResult.isErr()) {
			const err: IError = new Error(userResult.error.message)
			err.status = 411
			return next(err)
		} else {
			const data = await this.application.insert(userResult.value)
			// transformar el resultado. aplicar DTO
			const result = new UserInsertMapping().execute(data.properties())
			res.status(201).json(result)
		}
	}

	async list(req: Request, res: Response) {
		const list = await this.application.list()
		const result = new UserListMapping().execute(list.map((user) => user.properties()))
		res.json(result)
	}

	async listOne(req: Request, res: Response, next: NextFunction) {
		const { guid } = req.params

		const guidResult = GuidVO.create(guid)
		if (guidResult.isErr()) {
			const err: IError = new Error(guidResult.error.message)
			err.status = 411
			return next(err)
		}

		const userResult = await this.application.listOne(guid)

		if (userResult.isErr()) {
			return res.status(404).send(userResult.error.message)
		} else if (userResult.isOk()) {
			const result = new UserListOneMapping().execute(userResult.value.properties())
			res.json(result)
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		const { guid } = req.params
		const fieldsToUpdate = req.body

		const guidResult = GuidVO.create(guid)
		if (guidResult.isErr()) {
			const err: IError = new Error(guidResult.error.message)
			err.status = 411
			return next(err)
		}
		const dataResult = await this.application.update(guid, fieldsToUpdate)
		if (dataResult.isErr()) {
			const err: IError = new Error(dataResult.error.message)
			err.status = 411
		} else {
			const result = new UserUpdateMapping().execute(dataResult.value.properties())
			res.json(result)
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		const { guid } = req.params
		const guidResult = GuidVO.create(guid)
		if (guidResult.isErr()) {
			const err: IError = new Error(guidResult.error.message)
			err.status = 411
			return next(err)
		}
		const dataResult = await this.application.delete(guid)

		if (dataResult.isErr()) {
			const err: IError = new Error(dataResult.error.message)
			err.status = 404
			return next(err)
		} else {
			const result = new UserDeleteMapping().execute(dataResult.value.properties())
			res.json(result)
		}
	}
}
