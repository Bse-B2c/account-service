import { AddressDto } from '@address/dtos/address.dto';
import { Address } from '@address/entity/address.entity';

export interface AddressService {
	create(address: AddressDto): Promise<Address>;
	findOne(id: number): Promise<Address>;
}
