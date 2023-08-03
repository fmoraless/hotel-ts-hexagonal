import { ReservationProperties } from 'src/modules/reservation/domain/reservation'
import { DTO } from './dto.generic'

interface ReservationOneDTO {
	reservationnumber: number
	datestart: Date
	dateend: Date
	guid: string
	userId: string
}

export type ReservationListOneDTO = ReservationOneDTO

export class ReservationListOneMapping extends DTO<ReservationProperties, ReservationListOneDTO> {
	execute(data: ReservationProperties): ReservationListOneDTO {
		return {
			reservationnumber: data.reservationnumber,
			datestart: data.datestart,
			dateend: data.dateend,
			guid: data.guid,
			userId: data.userId,
		}
	}
}
