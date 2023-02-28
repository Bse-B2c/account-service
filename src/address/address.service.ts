import { AddressService as Service } from '@address/interfaces/addressService.interface';
import { Address } from '@address/entity/address.entity';
import { AddressDto } from '@address/dtos/address.dto';
import {
	Repository,
	FindOptionsWhere,
	FindOptionsOrderValue,
	In,
	Like,
	Equal,
} from 'typeorm';
import { UserService } from '@user/interfaces/userService.interface';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { SearchDto } from '@address/dtos/search.dto';

export class AddressService implements Service {
	constructor(
		private repository: Repository<Address>,
		private userService: UserService
	) {}

	create = async (address: AddressDto): Promise<Address> => {
		const user = await this.userService.findOne(address.userId);
		const existsAddress = user.addresses.find(
			({ streetName }) =>
				streetName.toLowerCase() === address.streetName.toLowerCase()
		);

		if (existsAddress)
			throw new HttpException({
				statusCode: HttpStatusCode.CONFLICT,
				message: `Address "${address.streetName}" already exists`,
			});

		const newAddress = this.repository.create({
			...address,
			user: user,
			active: user.addresses?.length <= 0,
		});

		return this.repository.save(newAddress);
	};

	findOne = async (id: number): Promise<Address> => {
		const address = await this.repository.findOne({ where: { id } });

		if (!address)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Address ${id} not found`,
			});

		return address;
	};

	find = async (search: SearchDto): Promise<Array<Address>> => {
		const {
			ids,
			userIds,
			text,
			active,
			city,
			country,
			region,
			zipCode,
			limit = 10,
			page = 0,
			orderBy = 'streetName',
			sortOrder = 'ASC',
		} = search;
		let where: FindOptionsWhere<Address> = {};

		if (ids) where = { ...where, id: In(ids) };

		if (userIds) where = { ...where, user: In(userIds) };

		if (text) where = { ...where, streetName: Like(`%${text}%`) };

		if (active !== undefined) where = { ...where, active };

		if (city) where = { ...where, city: Equal(city) };

		if (country) where = { ...where, country: Equal(country) };

		if (region) where = { ...where, region: Equal(region) };

		if (zipCode) where = { ...where, zipCode: Equal(zipCode) };

		return this.repository.find({
			relations: { user: true },
			loadRelationIds: true,
			where,
			order: {
				[orderBy]: sortOrder as FindOptionsOrderValue,
				streetName: sortOrder as FindOptionsOrderValue,
			},
			take: limit,
			skip: page * limit,
		});
	};
}
