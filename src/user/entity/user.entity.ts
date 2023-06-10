import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '@address/entity/address.entity';
import { Role } from '@common/enums/role.enum';
import { RefreshToken } from '@src/refreshToken/entity/refreshToken.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column({ select: false })
	password: string;

	@Column()
	phone: string;

	@Column()
	cpf: string;

	@Column()
	brithDate: Date;

	@Column({ default: new Date() })
	createdAt: Date;

	@OneToMany(() => Address, address => address.user, {
		onDelete: 'CASCADE',
		cascade: ['remove'],
	})
	addresses: Array<Address>;

	@Column({ default: [Role.CONSUMER], array: true, type: 'int' })
	roles: Array<number>;

	@OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
	refreshToken: Array<RefreshToken>;
}
