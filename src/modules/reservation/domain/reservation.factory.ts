import { v4 as uuidv4 } from 'uuid'
import Reservation, { ReservationProperties } from './reservation'
import {
	ReservationNumberRequireException,
	ReservationDateStartRequireException,
	ReservationDateEndRequireException,
	ReservationDateEndInvalidException,
	ReservationDateStartInvalidException,
	ReservationUserIdRequireException,
} from './exceptions/reservation.exception'
import { err, ok, Result } from 'neverthrow'

export type ReservationResult = Result<
	Reservation,
	| ReservationNumberRequireException
	| ReservationDateStartRequireException
	| ReservationDateEndRequireException
	| ReservationDateEndInvalidException
	| ReservationDateStartInvalidException
	| ReservationUserIdRequireException
>
export default class ReservationFactory {
	async create(reservationnumber: number, datestart: Date, dateend: Date, userId: string): Promise<ReservationResult> {
		if (!reservationnumber) {
			return err(new ReservationNumberRequireException())
		}
		if (!datestart) {
			return err(new ReservationDateStartRequireException())
		}
		if (!dateend) {
			return err(new ReservationDateEndRequireException())
		}
		if (!userId || userId.trim() === '') {
			return err(new ReservationUserIdRequireException())
		}

		const reservationProperties: ReservationProperties = {
			reservationnumber,
			datestart,
			dateend,
			userId,
			guid: uuidv4(),
		}

		const reservation = new Reservation(reservationProperties)
		return ok(reservation)
	}
}
