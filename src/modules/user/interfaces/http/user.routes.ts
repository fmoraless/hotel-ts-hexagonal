import { Router } from 'express'
import UserApplication from '../../application/user.application'
import { UserRepository } from '../../domain/user.repository'
import UserInfraestructure from '../../infraestructure/user.infraestructure'
import UserController from './user.controller'
import { MiddlewareListOne } from './middlewares/user.middleware'

const infraestructure: UserRepository = new UserInfraestructure()
const applicacion = new UserApplication(infraestructure)
const controller = new UserController(applicacion)

class UserRouter {
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

export default new UserRouter().expressRouter
