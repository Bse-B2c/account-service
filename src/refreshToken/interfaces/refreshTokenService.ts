import { RefreshToken } from '@src/refreshToken/entity/refreshToken.entity';
import { User } from '@user/entity/user.entity';
import { Token } from '@common/interfaces/token';

export type option = { secret: string; expiresIn: number | string };

export type RefreshTokenInfo = Omit<RefreshToken, 'user'>;

export interface RefreshTokenService {
	create(user: User): Promise<RefreshTokenInfo>;
	generateToken(payload: any, option: option): string;
	handle(key: string): Promise<Token>;
	isExpiredToken(expiresIn: number): boolean;
	deleteMany(userId: number): Promise<Array<RefreshToken>>;
}
