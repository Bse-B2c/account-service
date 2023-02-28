import { AddressDto } from '@address/dtos/address.dto';
import { Address } from '@address/entity/address.entity';
import { SearchDto } from '@address/dtos/search.dto';

export interface AddressService {
	create(address: AddressDto): Promise<Address>;
	findOne(id: number): Promise<Address>;
	find(search: SearchDto): Promise<Array<Address>>;
	delete(id: number): Promise<Address>;
}
