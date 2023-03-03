import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRequestDto {
	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}
