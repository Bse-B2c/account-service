import { UserService as Service } from '@user/interfaces/userService.interface';
import { PasswordUtils } from '@common/utils/password.utils';
import { UserDto } from '@user/dtos/user.dto';
import { User } from '@user/entity/user.entity';
import {
	Equal,
	FindOptionsWhere,
	In,
	ILike,
	Repository,
	Between,
	MoreThanOrEqual,
	LessThanOrEqual,
	FindOptionsSelect,
	ArrayContains,
} from 'typeorm';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { SearchDto } from '@user/dtos/search.dto';
import { Role } from '@common/enums/role.enum';

export const selectUser = {
	id: true,
	password: true,
	email: true,
	name: true,
	cpf: true,
	phone: true,
	addresses: true,
	createdAt: true,
	brithDate: true,
	roles: true,
};

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

	update = async (
		id: number,
		{ email, password, ...userData }: UserDto
	): Promise<User> => {
		const user = await this.findOne(id, selectUser);

		if (email.toLowerCase() !== user.email.toLowerCase()) {
			//TODO: send email confirmation
			user.email = email;
		}

		if (!this.passwordUtils.compare(password, user.password)) {
			//TODO: send email confirmation
			user.password = this.passwordUtils.generate(password);
		}

		Object.assign(user, userData);

		return await this.repository.save(user);
	};

	findOne = async (
		id: number,
		optionSelect?: FindOptionsSelect<User>
	): Promise<User> => {
		const user = await this.repository.findOne({
			relations: { addresses: true },
			select: optionSelect,
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

	findByEmail = (email: string, role?: Role): Promise<User | null> => {
		return this.repository.findOne({
			where: { email, roles: ArrayContains([role]) },
			select: selectUser,
		});
	};

	find = async (search: SearchDto): Promise<Array<User>> => {
		const {
			ids,
			name,
			email,
			cpf,
			phone,
			startDate,
			endDate,
			sortOrder = 'ASC',
			orderBy = 'name',
			page = 0,
			limit = 10,
		} = search;
		let where: FindOptionsWhere<User> = {};

		if (ids) where = { ...where, id: In(ids) };

		if (name) where = { ...where, name: ILike(`%${name}%`) };

		if (email) where = { ...where, email: Equal(email) };

		if (cpf) where = { ...where, cpf: Equal(cpf) };

		if (phone) where = { ...where, phone: Equal(phone) };

		if (startDate && endDate) {
			where = {
				...where,
				createdAt: Between(new Date(startDate), new Date(endDate)),
			};
		} else if (startDate) {
			where = {
				...where,
				createdAt: MoreThanOrEqual(new Date(startDate)),
			};
		} else if (endDate) {
			where = {
				...where,
				createdAt: LessThanOrEqual(new Date(endDate)),
			};
		}

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
