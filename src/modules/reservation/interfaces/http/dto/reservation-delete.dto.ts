import { ReservationProperties } from 'src/modules/reservation/domain/reservation'
import { DTO } from './dto.generic'

interface ReservationDTO {
	reservationnumber: number
	datestart: Date
	dateend: Date
	guid: string
	userId: string
}

export type ReservationDeleteDTO = ReservationDTO
export class ReservationDeleteMapping extends DTO<ReservationProperties, ReservationDeleteDTO> {
	execute(data: ReservationProperties): ReservationDeleteDTO {
		return {
			reservationnumber: data.reservationnumber,
			datestart: data.datestart,
			dateend: data.dateend,
			guid: data.guid,
			userId: data.userId,
		}
	}
}
