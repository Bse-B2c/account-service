import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// TODO: Add address property
// TODO: Add role property
@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	phone: string;

	@Column()
	cpf: string;

	@Column()
	brithDate: Date;

	@Column({ default: new Date() })
	createdAt: Date;
}
