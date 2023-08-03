import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm'
import { ReservationEntity } from '../../reservation/infraestructure/reservation.entity'

@Entity()
export class UserEntity {
	@PrimaryColumn()
	guid: string

	@Column({ type: 'varchar', length: 100 })
	name: string

	@Column({ type: 'varchar', length: 100 })
	lastname: string

	@Column({ type: 'varchar', length: 100 })
	email: string

	@Column({ type: 'varchar', length: 100 })
	password: string

	@Column({ type: 'boolean', default: true })
	active: boolean

	@OneToMany(() => ReservationEntity, (reservation) => reservation.user)
	reservations: ReservationEntity[]
}
