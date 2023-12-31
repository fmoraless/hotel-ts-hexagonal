import http from 'http'
import { Application } from 'express'
import { Bootstrap } from './base.bootstrap'
import { AppService } from './services/app.service'

export default class extends Bootstrap {
	constructor(private readonly app: Application) {
		super()
	}
	initialize(): Promise<string | Error> {
		return new Promise<string | Error>((resolve, reject) => {
			const server = http.createServer(this.app)

			server
				.listen(`${AppService.PORT}`)
				.on('listening', () => {
					console.log(`Server listening on port: ${AppService.PORT}`)
				})
				.on('error', (error) => {
					reject(error)
					console.log(`Error on listening server on port: ${AppService.PORT}`)
				})
		})
	}
}
