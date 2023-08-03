/* clase que expone los casos de uso */
import Reservation, { ReservationUpdate } from '../domain/reservation'
import { ReservationRepository } from '../domain/reservation.repository'

export default class ReservationApplication {
	constructor(private readonly reservationRepository: ReservationRepository) {}

	insert(reservation: Reservation) {
		return this.reservationRepository.insert(reservation)
	}

	list() {
		return this.reservationRepository.list()
	}

	listOne(guid: string) {
		return this.reservationRepository.listOne(guid)
	}

	update(guid: string, reservation: Partial<ReservationUpdate>) {
		return this.reservationRepository.update(guid, reservation)
	}

	delete(guid: string) {
		return this.reservationRepository.delete(guid)
	}
}
