import { RefreshTokenInfo } from '@src/refreshToken/interfaces/refreshTokenService';

export interface Token {
	token: string;
	refreshToken?: RefreshTokenInfo;
}
