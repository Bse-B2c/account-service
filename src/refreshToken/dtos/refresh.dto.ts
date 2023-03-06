import { IsNumber } from 'class-validator';

export class RefreshDto {
	@IsNumber()
	refreshToken: number;
}
