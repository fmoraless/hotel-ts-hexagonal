import { Request, Response, NextFunction } from 'express'
import { validate } from 'class-validator'
import { ReservationListOneValidator } from '../validators/reservationListOne.validator'

class ReservationMiddleware {
	static async ValidateListOne(req: Request, res: Response, next: NextFunction) {
		const { guid } = req.params
		const reservationListOneValidator = new ReservationListOneValidator()
		reservationListOneValidator.guid = guid
		const errors = await validate(reservationListOneValidator)

		if (errors.length > 0) {
			console.log(errors)
			return next(new Error('Invalid request'))
		}

		next()
	}
}

export const MiddlewareListOne: ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] = [
	ReservationMiddleware.ValidateListOne,
]
