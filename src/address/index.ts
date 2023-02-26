import { AddressController } from '@address/address.controller';
import { AddressService } from '@address/address.service';
import { Address } from '@address/entity/address.entity';
import { dataSource } from '@src/database';
import { userService } from '@src/user';

const repository = dataSource.getRepository(Address);
export const addressService = new AddressService(repository, userService);
export const addressController = new AddressController(addressService);
