import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@user/entity/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class RefreshToken {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	expiresIn: number;

	@Column({ default: uuidv4() })
	key: string;

	@ManyToOne(() => User, user => user.refreshToken, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	user: User;

	@Column()
	userId: number;
}
