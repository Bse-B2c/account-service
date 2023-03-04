import { AuthRequestDto } from '@auth/dtos/authRequest.dto';
import { Role } from '@common/enums/role.enum';

export interface Token {
	token: string;
	refreshToken: string;
}

export interface AuthService {
	signIn(request: AuthRequestDto, role?: Role): Promise<Token>;
}
