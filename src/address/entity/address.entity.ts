import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@user/entity/user.entity';

@Entity()
export class Address {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	zipCode: string;

	@Column()
	streetName: string;

	@Column()
	houseNumber: number;

	@Column()
	apartment: string;

	@Column()
	city: string;

	@Column()
	region: string;

	@Column()
	country: string;

	@Column({ default: false })
	active: boolean;

	@ManyToOne(() => User, user => user.addresses, {
		cascade: ['insert'],
		onDelete: 'CASCADE',
	})
	user: User;
}
