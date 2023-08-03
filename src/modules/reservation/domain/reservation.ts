import { IEntity } from '../../shared/entity.interface'

interface ReservationRequired {
	reservationnumber: number
	datestart: Date
	dateend: Date
	userId: string
}

interface ReservationOptional {
	active: boolean
	guid: string
}

export interface ReservationUpdate {
	reservationnumber: number
	datestart: Date
	dateend: Date
}

export type ReservationProperties = Required<ReservationRequired> & Partial<ReservationOptional>

export default class Reservation implements IEntity<ReservationProperties, ReservationUpdate> {
	private reservationnumber: number
	private datestart: Date
	private dateend: Date
	private userId: string
	private active: boolean
	private readonly guid: string

	constructor(reservationProperties: ReservationProperties) {
		this.active = true
		Object.assign(this, reservationProperties)
	}

	properties(): ReservationProperties {
		return {
			reservationnumber: this.reservationnumber,
			datestart: this.datestart,
			dateend: this.dateend,
			userId: this.userId,
			active: this.active,
			guid: this.guid,
		}
	}

	update(fields: ReservationUpdate) {
		Object.assign(this, fields)
	}

	delete() {
		this.active = false
	}
}
