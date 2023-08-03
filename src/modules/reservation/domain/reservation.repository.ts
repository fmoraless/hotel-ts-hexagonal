import { Result } from 'neverthrow'
import { ReservationNotFoundException } from './exceptions/reservation.exception'
import Reservation, { ReservationUpdate } from './reservation'

export interface ReservationRepository {
	insert(reservation: Reservation): Promise<Reservation>
	list(): Promise<Reservation[]>
	listOne(guid: string): Promise<Result<Reservation, ReservationNotFoundException>>
	update(
		guid: string,
		reservation: Partial<ReservationUpdate>,
	): Promise<Result<Reservation, ReservationNotFoundException>>
	delete(guid: string): Promise<Result<Reservation, ReservationNotFoundException>>
}
