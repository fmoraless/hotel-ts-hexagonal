import { Router } from 'express'
import ReservationApplication from '../../application/reservation.application'
import { ReservationRepository } from '../../domain/reservation.repository'
import ReservationInfraestructure from '../../infraestructure/reservation.infraestructure'
import ReservationController from './reservation.controller'
import { MiddlewareListOne } from './middlewares/reservation.middleware'

const infraestructure: ReservationRepository = new ReservationInfraestructure()
const applicacion = new ReservationApplication(infraestructure)
const controller = new ReservationController(applicacion)

class ReservationRouter {
	readonly expressRouter: Router

	constructor() {
		this.expressRouter = Router()
		this.mountRoutes()
	}

	// cargar las rutas con express router
	mountRoutes() {
		/*
		 *  Patron de diseño: Chain responsibility
		 *  https://refactoring.guru/es/design-patterns/chain-of-responsibility
		 */
		this.expressRouter.post('/', controller.insert)
		this.expressRouter.get('/', controller.list)
		this.expressRouter.get('/:guid', ...MiddlewareListOne, controller.listOne)
		this.expressRouter.put('/:guid', controller.update)
		this.expressRouter.delete('/:guid', controller.delete)
	}
}

export default new ReservationRouter().expressRouter
