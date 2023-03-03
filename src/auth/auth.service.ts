import {
	AuthService as Service,
	Token,
} from '@auth/interfaces/authService.interface';
import { AuthRequestDto } from '@auth/dtos/authRequest.dto';

export class AuthService implements Service {
	signIn = async (request: AuthRequestDto): Promise<Token> => {
		return { token: '', refreshToken: '' };
	};
}
