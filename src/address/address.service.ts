import { AddressService as Service } from '@address/interfaces/addressService.interface';
import { Address } from '@address/entity/address.entity';
import { AddressDto } from '@address/dtos/address.dto';
import { Repository } from 'typeorm';
import { UserService } from '@user/interfaces/userService.interface';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';

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
}
