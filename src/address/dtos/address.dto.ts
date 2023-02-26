import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class AddressDto {
	@IsNotEmpty()
	@IsString()
	zipCode: string;

	@IsNotEmpty()
	@IsString()
	streetName: string;

	@IsNotEmpty()
	@IsNumber()
	houseNumber: number;

	@IsNotEmpty()
	@IsString()
	apartment: string;

	@IsNotEmpty()
	@IsString()
	city: string;

	@IsNotEmpty()
	@IsString()
	region: string;

	@IsNotEmpty()
	@IsString()
	country: string;

	@IsOptional()
	@IsBoolean()
	active: boolean;

	@IsNotEmpty()
	@IsNumber()
	userId: number;
}
