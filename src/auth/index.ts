import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';

export const authService = new AuthService();
export const authController = new AuthController(authService);
