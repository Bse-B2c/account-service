import { AddressDto } from '@address/dtos/address.dto';
import { Address } from '@address/entity/address.entity';
import { SearchDto } from '@address/dtos/search.dto';
import { UpdateAddressDto } from '@address/dtos/updateAddress.dto';

export interface AddressService {
	create(address: AddressDto): Promise<Address>;
	findOne(id: number): Promise<Address>;
	find(search: SearchDto): Promise<Array<Address>>;
	delete(id: number): Promise<Address>;
	update(id: number, address: UpdateAddressDto): Promise<Address>;
	setActiveAddress(id: number): Promise<Address>;
}
