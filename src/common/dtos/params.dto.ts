import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class ParamsDTO {
	@Transform(({ value }) => +value)
	@IsNumber({}, { message: 'id must be a number' })
	id: number;
}
