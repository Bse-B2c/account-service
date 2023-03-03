import { UserDto } from '@user/dtos/user.dto';
import { User } from '@user/entity/user.entity';
import { SearchDto } from '@user/dtos/search.dto';
import { FindOptionsSelect } from 'typeorm';

export interface UserService {
	create(user: UserDto): Promise<User>;
	findOne(id: number, optionSelect?: FindOptionsSelect<User>): Promise<User>;
	delete(id: number): Promise<User>;
	update(id: number, userData: UserDto): Promise<User>;
	find(search: SearchDto): Promise<Array<User>>;
}
