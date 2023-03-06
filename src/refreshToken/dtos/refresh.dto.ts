import { IsString, IsUUID } from 'class-validator';

export class RefreshDto {
	@IsString()
	@IsUUID(4)
	refreshToken: string;
}
