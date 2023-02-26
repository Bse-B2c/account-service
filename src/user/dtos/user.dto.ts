import {
	IsEmail,
	IsISO8601,
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
} from 'class-validator';

export class UserDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsPhoneNumber('BR')
	@IsNotEmpty()
	phone: string;

	@IsNotEmpty()
	@IsString()
	cpf: string;

	@IsString()
	@IsISO8601()
	brithDate: string;
}
