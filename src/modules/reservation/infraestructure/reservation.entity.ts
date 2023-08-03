import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { UserEntity } from '../../user/infraestructure/user.entity'

@Entity()
export class ReservationEntity {
	@PrimaryColumn()
	guid: string

	@Column({ type: 'int' })
	reservationnumber: number

	@Column({ type: 'date' })
	datestart: Date

	@Column({ type: 'date' })
	dateend: Date

	@Column({ type: 'boolean', default: true })
	active: boolean

	@Column({ type: 'varchar', length: 100 })
	userId: string

	@ManyToOne(() => UserEntity, (user) => user.reservations)
	@JoinColumn({ name: 'userId' })
	user: UserEntity
}
