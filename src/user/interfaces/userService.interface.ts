import { CreateUserDto, UserDto } from '@user/dtos/user.dto';
import { User } from '@user/entity/user.entity';
import { SearchDto } from '@user/dtos/search.dto';
import { FindOptionsSelect } from 'typeorm';
import { Role } from '@common/enums/role.enum';

export interface UserService {
	create(user: CreateUserDto): Promise<User>;
	findOne(id: number, optionSelect?: FindOptionsSelect<User>): Promise<User>;
	delete(id: number): Promise<User>;
	update(id: number, userData: UserDto): Promise<User>;
	find(search: SearchDto): Promise<Array<User>>;
	findByEmail(email: string, role?: Role): Promise<User | null>;
}
