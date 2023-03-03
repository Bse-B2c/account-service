import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { userService } from '@src/user';
import { PasswordUtils } from '@common/utils/password.utils';

export const authService = new AuthService(userService, new PasswordUtils());
export const authController = new AuthController(authService);
