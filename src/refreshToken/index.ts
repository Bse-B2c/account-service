import { dataSource } from '@src/database';
import { RefreshToken } from '@src/refreshToken/entity/refreshToken.entity';
import { RefreshTokenService } from '@src/refreshToken/refreshToken.service';
import { RefreshTokenController } from '@src/refreshToken/refreshToken.controller';

const repository = dataSource.getRepository(RefreshToken);
export const refreshTokenService = new RefreshTokenService(repository);
export const refreshTokenController = new RefreshTokenController(
	refreshTokenService
);
