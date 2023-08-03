import { ReservationProperties } from 'src/modules/reservation/domain/reservation'
import { DTO } from './dto.generic'
interface ReservationDTO {
	reservationnumber: number
	datestart: Date
	dateend: Date
	guid: string
	userId: string
}

export type ReservationInsertOneDTO = ReservationDTO

export class ReservationInsertMapping extends DTO<ReservationProperties, ReservationDTO> {
	execute(data: ReservationProperties): ReservationInsertOneDTO {
		return {
			reservationnumber: data.reservationnumber,
			datestart: data.datestart,
			dateend: data.dateend,
			guid: data.guid,
			userId: data.userId,
		}
	}
}
