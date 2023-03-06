import {
	RefreshTokenService as Service,
	option,
	RefreshTokenInfo,
} from '@refreshToken/interfaces/refreshTokenService';
import { sign } from 'jsonwebtoken';
import { RefreshToken } from '@src/refreshToken/entity/refreshToken.entity';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { User } from '@user/entity/user.entity';
import { Repository } from 'typeorm';
import { Token } from '@common/interfaces/token';
import dayjs, { ManipulateType } from 'dayjs';

export class RefreshTokenService implements Service {
	constructor(private repository: Repository<RefreshToken>) {}

	generateToken = (payload: any, { secret, expiresIn }: option): string => {
		return sign(payload, secret, {
			expiresIn,
		});
	};

	create = async (user: User): Promise<RefreshTokenInfo> => {
		const time = Number(process.env['REFRESH_TOKEN_EXPIRES_TIME']) || 20;
		const unit = process.env['REFRESH_TOKEN_EXPIRES_UNIT'] || 'minute';
		const expiresIn = dayjs()
			.add(time, unit as ManipulateType)
			.unix();

		const newRefreshToken = await this.repository.create({
			expiresIn,
			user,
		});

		await this.repository.save(newRefreshToken);

		return {
			id: newRefreshToken.id,
			expiresIn,
			userId: newRefreshToken.userId,
			key: newRefreshToken.key,
		};
	};

	isExpiredToken = (expiresIn: number) =>
		dayjs().isAfter(dayjs.unix(expiresIn));

	handle = async (key: string): Promise<Token> => {
		const refreshToken = await this.repository.findOne({
			relations: { user: true },
			where: { key },
		});

		if (!refreshToken)
			throw new HttpException({
				message: 'Refresh token not found',
				statusCode: HttpStatusCode.NOT_FOUND,
			});

		const {
			user: { id: userId, name, roles },
			expiresIn,
		} = refreshToken;

		const payload = {
			name,
			roles,
		};

		const token = this.generateToken(payload, {
			secret: process.env['SECRET'] ?? 'secret',
			expiresIn,
		});

		if (this.isExpiredToken(expiresIn)) {
			await this.deleteMany(userId);

			const newRefreshToken = await this.create(refreshToken.user);

			return { token, refreshToken: newRefreshToken };
		}

		return { token, refreshToken: undefined };
	};

	deleteMany = async (userId: number): Promise<Array<RefreshToken>> => {
		const tokens = await this.repository.find({ where: { userId: userId } });

		if (tokens.length > 0) await this.repository.delete(tokens?.map(e => e.id));

		return tokens;
	};
}
