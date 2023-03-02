import { UserDto } from '@user/dtos/user.dto';
import { User } from '@user/entity/user.entity';
import { SearchDto } from '@user/dtos/search.dto';

export interface UserService {
	create(user: UserDto): Promise<User>;
	findOne(id: number): Promise<User>;
	delete(id: number): Promise<User>;
	find(search: SearchDto): Promise<Array<User>>;
}
