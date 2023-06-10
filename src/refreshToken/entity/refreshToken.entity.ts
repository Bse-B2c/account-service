import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@user/entity/user.entity';

@Entity()
export class RefreshToken {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	expiresIn: number;

	@Column()
	key: string;

	@Column({ default: new Date() })
	createdAt: Date;

	@ManyToOne(() => User, user => user.refreshToken, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	user: User;

	@Column()
	userId: number;
}
