import { Request, Response, NextFunction } from 'express'
import { IError } from '../helpers/ierror'
import ReservationFactory from '../../domain/reservation.factory'
import ReservationApplication from '../../application/reservation.application'
import { ReservationInsertMapping } from './dto/reservation-insert.dto'
import { ReservationListMapping } from './dto/reservation-list.dto'
import { GuidVO } from '../../domain/value-objects/guid.vo'
import { ReservationListOneMapping } from './dto/reservation-list-one.dto'
import { ReservationUpdateMapping } from './dto/reservation-update.dto'
import { ReservationDeleteMapping } from './dto/reservation-delete.dto'
export default class {
	constructor(private application: ReservationApplication) {
		this.insert = this.insert.bind(this)
		this.list = this.list.bind(this)
		this.listOne = this.listOne.bind(this)
		this.update = this.update.bind(this)
		/*this.delete = this.delete.bind(this) */
	}

	async insert(req: Request, res: Response, next: NextFunction) {
		const { reservationnumber, datestart, dateend, userId } = req.body

		const reservationResult = await new ReservationFactory().create(reservationnumber, datestart, dateend, userId)
		if (reservationResult.isErr()) {
			const err: IError = new Error(reservationResult.error.message)
			err.status = 411
			return next(err)
		} else {
			const data = await this.application.insert(reservationResult.value)
			// transformar el resultado. aplicar DTO
			const result = new ReservationInsertMapping().execute(data.properties())
			res.status(201).json(result)
		}
	}

	async list(req: Request, res: Response) {
		const list = await this.application.list()
		const result = new ReservationListMapping().execute(list.map((reservation) => reservation.properties()))
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

		const reservationResult = await this.application.listOne(guid)

		if (reservationResult.isErr()) {
			return res.status(404).send(reservationResult.error.message)
		} else if (reservationResult.isOk()) {
			const result = new ReservationListOneMapping().execute(reservationResult.value.properties())
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
			const result = new ReservationUpdateMapping().execute(dataResult.value.properties())
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
			const result = new ReservationDeleteMapping().execute(dataResult.value.properties())
			res.json(result)
		}
	}
}
