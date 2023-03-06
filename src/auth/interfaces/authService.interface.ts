import { AuthRequestDto } from '@auth/dtos/authRequest.dto';
import { Role } from '@common/enums/role.enum';
import { Token } from '@common/interfaces/token';

export interface AuthService {
	signIn(request: AuthRequestDto, role?: Role): Promise<Token>;
}
