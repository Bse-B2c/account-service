import { AuthRequestDto } from '@auth/dtos/authRequest.dto';

export interface Token {
	token: string;
	refreshToken: string;
}

export interface AuthService {
	signIn(request: AuthRequestDto): Promise<Token>;
}
