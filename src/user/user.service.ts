import { UserService as Service } from '@user/interfaces/userService.interface';
import { PasswordUtils } from '@common/utils/password.utils';
import { UserDto } from '@user/dtos/user.dto';
import { User } from '@user/entity/user.entity';
import { Equal, FindOptionsWhere, In, Repository } from 'typeorm';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { SearchDto } from '@user/dtos/search.dto';

export class UserService implements Service {
	constructor(
		private repository: Repository<User>,
		private passwordUtils: PasswordUtils
	) {}

	create = async ({
		name,
		password,
		email,
		brithDate,
		cpf,
		phone,
	}: UserDto): Promise<User> => {
		const user = await this.repository.findOne({ where: { email } });

		if (user)
			throw new HttpException({
				statusCode: HttpStatusCode.CONFLICT,
				message: `The user already exists.`,
			});

		const newUser = this.repository.create({
			name,
			email,
			cpf,
			phone,
			password: this.passwordUtils.generate(password),
			brithDate: new Date(brithDate),
		});

		return this.repository.save(newUser);
	};

	findOne = async (id: number): Promise<User> => {
		const user = await this.repository.findOne({
			relations: { addresses: true },
			where: { id },
		});

		if (!user)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `User ${id} not found`,
			});

		return user;
	};

	delete = async (id: number) => {
		const user = await this.findOne(id);

		await this.repository.delete(id);

		return user;
	};

	find = async (search: SearchDto): Promise<Array<User>> => {
		const {
			ids,
			email,
			sortOrder = 'ASC',
			orderBy = 'name',
			page = 0,
			limit = 10,
		} = search;
		let where: FindOptionsWhere<User> = {};

		if (ids) where = { ...where, id: In(ids) };

		if (email) where = { ...where, email: Equal(email) };

		return this.repository.find({
			relations: { addresses: true },
			loadRelationIds: true,
			where,
			order: { [orderBy]: sortOrder },
			take: limit,
			skip: limit * page,
		});
	};
}
