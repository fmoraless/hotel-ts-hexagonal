import { ReservationProperties } from 'src/modules/reservation/domain/reservation'
import { DTO } from './dto.generic'

interface ReservationDTO {
	reservationnumber: number
	datestart: Date
	dateend: Date
	guid: string
	userId: string
}

export type ReservationListDTO = ReservationDTO[]

export class ReservationListMapping extends DTO<ReservationProperties[], ReservationListDTO> {
	execute(data: ReservationProperties[]): ReservationListDTO {
		return data.map((reservation: ReservationProperties) => {
			return {
				reservationnumber: reservation.reservationnumber,
				datestart: reservation.datestart,
				dateend: reservation.dateend,
				guid: reservation.guid,
				userId: reservation.userId,
			}
		})
	}
}
