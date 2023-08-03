import { DomainException, DomainExceptionCode } from './domain.exception'

export class ReservationNumberRequireException extends DomainException {
	constructor() {
		super(ReservationNumberRequireException.getMessage())
		this.name = DomainExceptionCode.RESERVATION_NUMBER_REQUIRED
	}
	static getMessage() {
		return 'Reservation number is required'
	}
}

export class ReservationDateStartRequireException extends DomainException {
	constructor() {
		super(ReservationDateStartRequireException.getMessage())
		this.name = DomainExceptionCode.RESERVATION_DATE_START_REQUIRED
	}
	static getMessage() {
		return 'Date start is required'
	}
}

export class ReservationDateEndRequireException extends DomainException {
	constructor() {
		super(ReservationDateEndRequireException.getMessage())
		this.name = DomainExceptionCode.RESERVATION_DATE_END_REQUIRED
	}
	static getMessage() {
		return 'Date end is required'
	}
}

export class ReservationDateStartInvalidException extends DomainException {
	constructor() {
		super(ReservationDateStartInvalidException.getMessage())
		this.name = DomainExceptionCode.RESERVATION_DATE_START_INVALID
	}
	static getMessage() {
		return 'Date start is invalid'
	}
}

export class ReservationDateEndInvalidException extends DomainException {
	constructor() {
		super(ReservationDateEndInvalidException.getMessage())
		this.name = DomainExceptionCode.RESERVATION_DATE_END_INVALID
	}
	static getMessage() {
		return 'Date end is invalid'
	}
}

export class ReservationGuidInvalidException extends DomainException {
	constructor() {
		super(ReservationGuidInvalidException.getMessage())
		this.name = DomainExceptionCode.RESERVATION_GUID_INVALID
	}
	static getMessage() {
		return 'Guid is invalid'
	}
}

export class ReservationUserIdRequireException extends DomainException {
	constructor() {
		super(ReservationUserIdRequireException.getMessage())
		this.name = DomainExceptionCode.RESERVATION_USER_ID_REQUIRED
	}
	static getMessage() {
		return 'Reservation not found'
	}
}

export class ReservationNotFoundException extends DomainException {
	constructor() {
		super(ReservationNotFoundException.getMessage())
		this.name = DomainExceptionCode.RESERVATION_NOT_FOUND
	}
	static getMessage() {
		return 'Reservation not found'
	}
}
