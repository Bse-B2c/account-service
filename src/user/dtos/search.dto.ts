import { IsIn, IsISO8601, IsOptional, IsString } from 'class-validator';
import { formatQueryToArray } from '@common/utils/query.utils';
import { Transform } from 'class-transformer';
import { BaseSearchFilter } from '@common/dtos/baseSearchFilter.dto';

export class SearchDto extends BaseSearchFilter {
	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);

		return value;
	})
	ids: Array<number>;

	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	email: string;

	@IsOptional()
	@IsString()
	phone: string;

	@IsOptional()
	@IsString()
	cpf: string;

	@Transform(({ value }) =>
		['undefined', 'null'].includes(value) ? undefined : value
	)
	@IsOptional()
	@IsISO8601()
	startDate: string;

	@IsOptional()
	@IsISO8601()
	@Transform(({ value }) =>
		['undefined', 'null'].includes(value) ? undefined : value
	)
	endDate: string;

	@IsString()
	@IsIn([
		'id',
		'name',
		'email',
		'phone',
		'cpf',
		'brithDate',
		'createdAt',
		'role',
	])
	@IsOptional()
	orderBy?: string;
}
