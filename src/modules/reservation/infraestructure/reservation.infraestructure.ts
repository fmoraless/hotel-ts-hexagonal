import Reservation, { ReservationUpdate } from '../domain/reservation'
import { ReservationRepository } from '../domain/reservation.repository'
import { ReservationEntity } from './reservation.entity'
import DatabaseBootstrap from '../../../bootstrap/database.bootstrap'

import {
	ReservationNumberRequireException,
	ReservationNotFoundException,
	ReservationDateStartRequireException,
	ReservationDateEndRequireException,
} from '../domain/exceptions/reservation.exception'
import { Result, err, ok } from 'neverthrow'

export default class ReservationInfraestructure implements ReservationRepository {
	async insert(reservation: Reservation): Promise<Reservation> {
		const reservationInsert = new ReservationEntity()
		const { guid, reservationnumber, datestart, dateend, userId, active } = reservation.properties()
		Object.assign(reservationInsert, {
			guid,
			reservationnumber,
			datestart,
			dateend,
			userId,
			active,
		})
		await DatabaseBootstrap.dataSource.getRepository(ReservationEntity).save(reservationInsert)

		return reservation
	}

	async list(): Promise<Reservation[]> {
		const repo = DatabaseBootstrap.dataSource.getRepository(ReservationEntity)

		const result = await repo.find({ where: { active: true } })

		return result.map((el: ReservationEntity) => {
			return new Reservation({
				guid: el.guid,
				reservationnumber: el.reservationnumber,
				datestart: el.datestart,
				dateend: el.dateend,
				userId: el.userId,
				active: el.active,
			})
		})
	}

	async listOne(guid: string): Promise<Result<Reservation, ReservationNotFoundException>> {
		const repo = DatabaseBootstrap.dataSource.getRepository(ReservationEntity)
		const result = await repo.findOne({ where: { guid } })

		if (!result) {
			return err(new ReservationNotFoundException())
		} else {
			return ok(
				new Reservation({
					guid: result.guid,
					reservationnumber: result.reservationnumber,
					datestart: result.datestart,
					dateend: result.dateend,
					userId: result.userId,
				}),
			)
		}
	}

	async update(
		guid: string,
		reservation: Partial<ReservationUpdate>,
	): Promise<Result<Reservation, ReservationNotFoundException>> {
		const repo = DatabaseBootstrap.dataSource.getRepository(ReservationEntity)

		const reservationFound = await repo.findOne({ where: { guid } })

		if (reservationFound) {
			Object.assign(reservationFound, reservation)
			const ReservationEntity = await repo.save(reservationFound)

			return ok(
				new Reservation({
					guid: ReservationEntity.guid,
					reservationnumber: ReservationEntity.reservationnumber,
					datestart: ReservationEntity.datestart,
					dateend: ReservationEntity.dateend,
					userId: ReservationEntity.userId,
					active: ReservationEntity.active,
				}),
			)
		}
	}

	async delete(guid: string): Promise<Result<Reservation, ReservationNotFoundException>> {
		const repo = DatabaseBootstrap.dataSource.getRepository(ReservationEntity)
		const reservationFound = await repo.findOne({ where: { guid } })
		if (reservationFound) {
			reservationFound.active = false
			const ReservationEntity = await repo.save(reservationFound)

			return ok(
				new Reservation({
					guid: ReservationEntity.guid,
					reservationnumber: ReservationEntity.reservationnumber,
					datestart: ReservationEntity.datestart,
					dateend: ReservationEntity.dateend,
					userId: ReservationEntity.userId,
					active: ReservationEntity.active,
				}),
			)
		} else {
			return err(new ReservationNotFoundException())
		}
	}
}
