import { UserDto } from '@user/dtos/user.dto';
import { User } from '@user/entity/user.entity';

export interface UserService {
	create(user: UserDto): Promise<User>;
	findOne(id: number): Promise<User>;
}
