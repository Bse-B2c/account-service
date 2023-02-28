import {
	IsBoolean,
	IsIn,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseSearchFilter } from '@common/dtos/baseSearchFilter.dto';
import { formatQueryToArray } from '@common/utils/query.utils';

export class SearchDto extends BaseSearchFilter {
	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);

		return value;
	})
	@IsNumber({}, { each: true })
	ids: Array<number>;

	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);

		return value;
	})
	@IsNumber({}, { each: true })
	userIds: Array<number>;

	@IsOptional()
	@IsString()
	zipCode: string;

	@IsOptional()
	@IsString()
	text: string;

	@IsOptional()
	@IsString()
	city: string;

	@IsOptional()
	@IsString()
	region: string;

	@IsOptional()
	@IsString()
	country: string;

	@IsOptional()
	@Transform(({ value }) => value === 'true')
	@IsBoolean()
	active: boolean;

	@IsString()
	@IsIn([
		'id',
		'zipCode',
		'streetName',
		'city',
		'country',
		'user',
		'active',
		'region',
	])
	@IsOptional()
	orderBy?: string;
}
