import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { userService } from '@src/user';
import { PasswordUtils } from '@common/utils/password.utils';
import { refreshTokenService } from '@src/refreshToken';

export const authService = new AuthService(
	userService,
	refreshTokenService,
	new PasswordUtils()
);
export const authController = new AuthController(authService);
